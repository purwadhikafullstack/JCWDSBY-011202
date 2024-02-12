import order_details from "../models/order_details";
import warehouse_mutation from "../models/warehouse_mutation";
import warehouse_storage from "../models/warehouse_storage";

export const requestMutation = async (req, res, next) => {
    try {
        console.log("masuk mutasi", req.query);
        const orderItems = await order_details.findAll({
            where: {
                order_id: req.query.order,
                // invoice: req.query.inv
            },
            raw: true
        })
        const productId = orderItems.map((val, idx) => { return val.product_id })
        console.log("orderitems", orderItems);
        console.log("pro id", productId);
        const productStock = await warehouse_storage.findAll({
            where: {
                warehouse_id: orderItems[0].warehouse_id,
                // product_id: productId,
                is_deleted: 0
            }, raw: true
        })
        console.log("apakah", productStock);
        const productIdLessStock = []
        const productLessStock = []
        orderItems.map(async (val, id) => {
            try {
                if (val.product_id == productStock[id].product_id) {
                    if (val.quantity > productStock[id].stock) {
                        productIdLessStock.push(val.product_id)
                        productLessStock.push({ product_id: val.product_id, quantity: val.quantity, warehouseStock: productStock[id].stock })
                    } else {
                        const updateStock = await warehouse_storage.update({
                            stock: productStock[id].stock - val.quantity
                        }, {
                            where: {
                                warehouse_id: val.warehouse_id,
                                product_id: val.product_id
                            }
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })
        let total = 0
        console.log("pro id less", productIdLessStock);
        console.log("pro less", productLessStock);
        if (productIdLessStock.length > 0) {
            console.log("masuk sini1");
            const searchStock = await warehouse_storage.findAll({
                where: {
                    product_id: productIdLessStock,
                },
                order: [["stock", "DESC"]],
                raw: true
            })
            console.log("masuk sini2");
            const itemMutation = []
            let date = new Date()
            for (let i = 0; i < productLessStock.length; i++) {
                total = parseInt(productLessStock[i].warehouseStock)
                for (let j = 0; j < searchStock.length; j++) {
                    if (
                        searchStock[j].product_id == productLessStock[i].product_id &&
                        productLessStock[i].quantity > total &&
                        searchStock[j].warehouse_id != productLessStock[i].warehouse_id) {
                        console.log("masuk sini3");
                        const countMutation = await warehouse_mutation.findAndCountAll({
                            where: {
                                destination_warehouse_id: orderItems[0].warehouse_id
                            }, raw: true
                        })
                        console.log("hitung", countMutation);
                        total = total + parseInt(searchStock[j].stock)
                        // console.log("hola",searchStock[j]);
                        itemMutation.push({
                            mutation_code: `MUT/${date.getFullYear()}${date.getMonth()}${date.getDate()}/ORI${orderItems[0].warehouse_id}/DEST${searchStock[j].warehouse_id}/PR${productLessStock[i].product_id}/${countMutation.count}/${j + 1}`,
                            product_id: productLessStock[i].product_id,
                            warehouse_id: orderItems[0].warehouse_id,
                            source_warehouse_id: searchStock[j].warehouse_id,
                            destination_warehouse_id: orderItems[0].warehouse_id,
                            quantity: productLessStock[i].quantity >= total ? searchStock[j].stock:productLessStock[i].quantity-total,
                            stock : productLessStock[i].quantity - total,
                            mutation_type: "request",
                            status: "waiting for confirmation"
                        })
                        console.log("kesini", itemMutation);
                        const updateStock = await warehouse_storage.update({
                            stock: productLessStock[i].quantity - total
                        }, {
                            where: {
                                warehouse_id: searchStock[j].warehouse_id,
                                product_id: productLessStock[i].product_id
                            }
                        })
                    }
                }
            }
            console.log("masuk sini3", itemMutation);
            const createMutation = await warehouse_mutation.bulkCreate(itemMutation)
        }

        return res.status(200).send("Success create mutation")
    } catch (error) {
        console.log("error hy");
        return res.status(500).send(error)
    }
}