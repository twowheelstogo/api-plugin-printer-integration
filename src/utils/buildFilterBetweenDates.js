
/**
 * @summary - helper to get filter between dates
 * @param {*} initDate 
 * @param {*} endDate 
 * @returns 
 */
export default function buildFilterBetweenDates(initDate, endDate) {
    return [
        {
            $match: {
                $and: [{
                    deliveryDate: {
                        $gte: initDate
                    }
                }, {
                    deliveryDate: {
                        $lte: endDate
                    }
                }]
            }
        },
        {
            $addFields: {
                uniqueHour: {
                    $dateToString: {
                        format: "%Y-%m-%d-%H",
                        date: "$deliveryDate"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$uniqueHour",
                first: { $first: "$$ROOT" }
            }
        }
    ];
}