
/**
 * @summary Builds an order
 * @param {Object} order an order to build
 * @returns {Object} An order builded,
 */
export default function buildOrder(order) { 

    const cleanedItems = order.items.map((item) => {
        return {
            id:item._id,
            productId: item._id,
            name: item.title,
            quantity: item.quantity,
            price: item.price.amount,
            properties: []
        };
    }); 

    const cleanedBilling = {

    }

    const cleanedShipping = {

    };

    const cleanedTotal = {

    };

    const cleanedShippingTotal = {

    };

    const cleanedMetadata = {

    };

    const cleanedShippingLines = {

    };

    return {
        id: order._id,
        order_number: order.orderId,
        line_items: cleanedItems,
        billing_address: cleanedBilling,
        shipping_address: cleanedShipping,
        note: (order.notes && order.notes[0].content) || "",
        total_price_set: cleanedTotal,
        total_shipping_price_set: cleanedShippingTotal,
        email: order.email || "",
        note_attributes: cleanedMetadata,
        shipping_lines: cleanedShippingLines
    };;
}