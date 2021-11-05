import buildFilterBetweenDates from "./buildFilterBetweenDates.js";
/**
 * @method getClosestOrderByTime
 * @summary gets a single account by id
 * @param {context} - request context
 * @param {date} - request date
 * @returns {Promise<Object>} returns list of orders
 */
export default async function getClosestOrderByTime(context, date) {
    const { collections } = context;
    const { Orders } = collections;
    const initDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 5);
    const filter = buildFilterBetweenDates(initDate, endDate);

    const nodes = await Orders.aggregate(filter);

    return nodes.toArray();
}