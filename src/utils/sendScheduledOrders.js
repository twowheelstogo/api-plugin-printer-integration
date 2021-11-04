import ReactionError from "@reactioncommerce/reaction-error";
import sendOrderToPrinter from "./sendOrderToPrinter.js";

/**
 * @method sendScheduledOrders
 * @summary sends a current order to printer system to be printed
 * @param {Object} context - current context
 * @param {Object} node - current node of the order
 */
export default async function sendScheduledOrders(context, node) {
    const { collections } = context;
    const { Orders } = collections;

    const order = node.first;

    if (order.workflow.status == "scheduled") {
        await sendOrderToPrinter(context, order);
        const selector = {
            $set: {
                workflow: {
                    status: "processing",
                    workflow: ["processing"]
                }
            }
        }
        const { value: updatedOrder } = await Orders.findOneAndUpdate({ _id: order._id }, selector, { upsert: true });

        if (!updatedOrder) throw new ReactionError("not-found", "Order not found");

        console.log(updatedOrder);
    }
}