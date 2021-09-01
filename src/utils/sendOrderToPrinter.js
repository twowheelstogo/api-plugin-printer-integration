import axios from "axios";
import { PRINTER_API } from "../constants.js";
import buildOrderUtil from "./buildOrder.js";
import ReactionError from "@reactioncommerce/reaction-error";

/**
 * @method sendOrderToPrinter
 * @summary sends a current order to printer system to be printed
 * @param {Object} context - current context
 * @param {Object} order - order of current
 */
export default async function sendOrderToPrinter(context, order) {
    const { collections } = context;
    const { Accounts } = collections;

    const orderAccount = await Accounts.findOne({ _id: order.accountId });

    if (orderAccount) order["account"] = orderAccount;

    const cleanedOrder = buildOrderUtil(order);

    try {
        await axios({
            url: PRINTER_API,
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: cleanedOrder
        });

    } catch (error) {
        console.error(error);
        throw new ReactionError("bad-request", "Error agregando orden a sistema de impresión: " + error.message.toString());
    }
}