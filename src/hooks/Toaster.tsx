import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const Toaster = {
    success : (message : any) => {
        toast.success(message)
    },
    error : (message : any) => {
        toast.error(message)
    },
    info : (message : any) => {
        toast.info(message)
    },
    warning : (message : any) => {
        toast.warning(message)
    },

}

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast:any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })