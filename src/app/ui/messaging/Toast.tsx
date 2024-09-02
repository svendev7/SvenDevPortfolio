// import { Toaster, toast } from "sonner";
// import { bodyStyles } from "../typography/Body";
// import clsx from "clsx";
// import { Icon } from "../iconography/Icon";
//
// // styling options for the Sonner toast component that is used to display toast messages
// // sadly can't use our components for the text, but we can style them the same
// type ToastOptionsType = React.ComponentProps<typeof Toaster>["toastOptions"];
// export const toastOptions: ToastOptionsType = {
//     closeButton: true,
//     classNames: {
//         toast: "bg-neutral-300",
//         title: clsx(bodyStyles.body1, "font-semibold"),
//         description: clsx(bodyStyles.body2, "font-medium text-neutral-600"),
//         closeButton: "ml-auto top-4 right-0",
//         icon: "size-12 bg-primary text-neutral-100 flex items-center justify-center rounded-md mr-2",
//     },
// };
//
// type ToastIconsType = React.ComponentProps<typeof Toaster>["icons"];
// export const toastIcons: ToastIconsType = {
//     success: <Icon iconName="check" />,
//     info: <Icon iconName="info" />,
//     warning: <Icon iconName="warning" />,
//     error: <Icon iconName="error" />,
//     loading: <Icon iconName="loading" />,
// };
//
// // ---
// // seperate methods below so we can add any custom styling or logic for each type of toast
// // ---
//
// export const createInfoToast = (
//     title: string,
//     description: string,
//     icon?: string
// ) => {
//     toast(title, {
//         description,
//         icon: icon? <Icon iconName={icon} /> : toastIcons.info,
//     });
// };
//
// export const createSuccessToast = (
//     title: string,
//     description: string,
//     icon?: string
// ) => {
//     toast.success(title, {
//         description,
//         icon: icon? <Icon iconName={icon} /> : toastIcons.success,
//     });
// };
//
// export const createWarningToast = (
//     title: string,
//     description: string,
//     icon?: string
// ) => {
//     toast.warning(title, {
//         description,
//         icon: icon? <Icon iconName={icon} /> : toastIcons.warning,
//     });
// };
//
// export const createErrorToast = (
//     title: string,
//     description: string,
//     icon?: string
// ) => {
//     toast.error(title, {
//         description,
//         icon: icon? <Icon iconName={icon} /> : toastIcons.error,
//     });
// };
