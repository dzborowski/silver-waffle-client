import {ReactNotificationOptions, store} from "react-notifications-component";
import {NotificationType} from "./NotificationType";

export class NotificationUtil {
    public static success(options: Partial<ReactNotificationOptions>): void {
        store.addNotification({
            ...NotificationUtil.getBaseConfig(),
            type: NotificationType.SUCCESS,
            ...options,
        });
    }

    public static info(options: Partial<ReactNotificationOptions>): void {
        store.addNotification({
            ...NotificationUtil.getBaseConfig(),
            type: NotificationType.INFO,
            ...options,
        });
    }

    public static danger(options: Partial<ReactNotificationOptions>): void {
        store.addNotification({
            ...NotificationUtil.getBaseConfig(),
            type: NotificationType.DANGER,
            ...options,
        });
    }

    public static addNotification(options: Partial<ReactNotificationOptions>): void {
        store.addNotification({
            ...NotificationUtil.getBaseConfig(),
            ...options,
        });
    }

    protected static getBaseConfig(): ReactNotificationOptions {
        return {
            insert: "bottom",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
            },
        };
    }
}
