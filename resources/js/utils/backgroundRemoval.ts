export interface BackgroundRemovalOptions {
    onProgress?: (progress: number) => void;
    quality?: 'low' | 'medium' | 'high';
}

export async function removeImageBackground(
    file: File,
    options: BackgroundRemovalOptions = {}
): Promise<File> {
    const { onProgress, quality = 'medium' } = options;
    
    // Map quality levels to actual model names
    const getModelName = (quality: 'low' | 'medium' | 'high') => {
        switch (quality) {
            case 'low':
                return 'isnet_quint8'; // Fastest, lower quality
            case 'medium':
                return 'isnet'; // Balanced
            case 'high':
                return 'isnet_fp16'; // Best quality, slower
            default:
                return 'isnet';
        }
    };
    
    try {
        // Dynamic import to avoid issues during initial load
        const { removeBackground } = await import('@imgly/background-removal');
        
        // Convert file to blob for processing
        const imageBlob = await removeBackground(file, {
            progress: onProgress ? (_key: string, current: number, total: number) => {
                const progressPercent = total > 0 ? current / total : 0;
                onProgress(progressPercent);
            } : undefined,
            model: getModelName(quality),
        });
        
        // Create new file with background removed
        const fileName = file.name.replace(/\.[^/.]+$/, '_bg_removed.png');
        const processedFile = new File([imageBlob], fileName, {
            type: 'image/png',
            lastModified: Date.now(),
        });
        
        return processedFile;
    } catch (error) {
        console.error('Background removal failed:', error);
        throw new Error('Failed to remove background from image');
    }
}

export function createImagePreview(file: File): string {
    return URL.createObjectURL(file);
}

export function revokeImagePreview(url: string): void {
    URL.revokeObjectURL(url);
}