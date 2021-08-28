import axios from "axios";
import { PRINTER_API } from "../constants.js";
import buildOrderItem from "./buildOrder.js";
/**
 * @method sendOrderToPrinter
 * @summary sends a current order to printer system to be printed
 * @param {Object} context - current context
 * @param {Object} order - order of current
 */
export default async function sendOrderToPrinter(context, order) {
    
}