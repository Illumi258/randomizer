-- Add status column to participants table if it doesn't exist
ALTER TABLE participants ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';

-- Update existing participants to have active status
UPDATE participants SET status = 'active' WHERE status IS NULL;