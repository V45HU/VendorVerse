import Notification from "../models/Notification.js";

export const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  link = "",
  referenceId = null,
  referenceModel = "",
}) => {
  return await Notification.create({
    recipient,

    sender,

    type,

    title,

    message,

    link,

    referenceId,

    referenceModel,
  });
};
