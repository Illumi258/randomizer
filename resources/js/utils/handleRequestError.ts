import Swal from "sweetalert2";
export const HandleRequestError = (error: unknown, 
    fallbackMessage ='Something went wrong',
    onBeforeShow?: ()=> void, // Closing Dialog
    onAfterClose?: ()=> void // Opening Dialog
): void => {
   
    let message = fallbackMessage;
 
    // Log error for debugging
    console.error('Request Error:', error);

    // check if error was from axios
    if(
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.data
    ){
      const res = (error as any).response;  

      // if laravel validation error (422)
      if(res.status === 422 && res.data.errors){
        const messages = Object.values(res.data.errors).flat().join('\n');
        message = messages;
      }
      // if laravel general error (500)
      else if(res.status === 500 && res.data.message){
        message = res.data.message;
      }
      else if(res.data.message){
        message = res.data.message;
      }
    }


    if(typeof onBeforeShow === 'function'){
        onBeforeShow();
    }
    // Display error is Swal
    setTimeout(() =>{
    Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: message,
        confirmButtonText: 'Close',
        allowOutsideClick: false,
        allowEscapeKey: true,
        backdrop: true,
    }).then(() =>{
        if (typeof onAfterClose === 'function'){
            onAfterClose();
        }
    });
    }, 50);

    // Silence console error logs outside development
    if ((import.meta as any)?.env?.MODE === 'development') {
        // console.error(error);
    }
};