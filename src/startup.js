import sendOrderToPrinter from "./utils/sendOrderToPrinter.js";

/**
 * @summary called on Startup
 * @param {Object} context startup context
 * @returns {undefined}
 */
export default async function printerStartup(context) {
    const { appEvents } = context;

    appEvents.on("afterOrderCreate", ({ order }) => sendOrderToPrinter(context, order));
};
