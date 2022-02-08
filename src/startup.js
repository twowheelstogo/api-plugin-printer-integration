import sendOrderToPrinter from "./utils/sendOrderToPrinter.js";
import cron from "node-cron";
import getClosestOrderByTime from "./utils/getClosestOrderByTime.js";
import sendScheduledOrders from "./utils/sendScheduledOrders.js";

/**
 * @summary called on Startup
 * @param {Object} context startup context
 * @returns {undefined}
 */
export default async function printerStartup(context) {
    const { appEvents } = context;
    console.log("this is a test");

    appEvents.on("afterOrderCreate", ({ order }) => {
        if (!order.deliveryDate) sendOrderToPrinter(context, order);
    });

    cron.schedule("* * * * *", async () => {
        console.log("scheduled task every minute");

        const date = new Date();
        const orders = await getClosestOrderByTime(context, date);

        (orders || []).forEach(async (node) => sendScheduledOrders(context, node));
    });

};
