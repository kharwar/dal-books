import moment from "moment";

export const dateFormat = (date, format) => moment(date).format(format);
