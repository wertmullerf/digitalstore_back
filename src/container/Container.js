const fs = require("fs");
class Container {
    constructor(fileName) {
        this.filePath = `./src/db/${fileName}.json`;
    }
    getAll = async () => {
        try {
            const file = await fs.promises.readFile(this.filePath, "utf-8");
            const products = JSON.parse(file);
            return products;
        } catch (e) {
            console.log(e);
        }
    };
    save = async (product) => {
        try {
            const products = await this.getAll();
            const id =
                products.length === 0
                    ? 1
                    : products[products.length - 1].id + 1;
            product.id = id;
            products.push(product);
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(products, null)
            );
            return product.id;
        } catch (e) {}
    };
    getById = async (id) => {
        try {
            const products = await this.getAll();
            const productFound = products.find((product) => product.id == id);

            if (!productFound)
                return console.log("This product does not exist.");

            return productFound;
        } catch (e) {
            console.log(e);
        }
    };

    async deleteById(id) {
        try {
            const products = await this.getAll();
            const productFound = products.find((e) => e.id == id);
            if (!productFound)
                return console.log("This product does not exist.");
            const productsFilter = products.filter((e) => e.id != id);
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(productsFilter, null)
            );
            console.log("This product was deleted successfully.");
        } catch (e) {
            console.log(e);
        }
    }
    deleteAll = async () => {
        try {
            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify([], null)
            );
            console.log("The array was deleted successfully.");
        } catch (e) {
            console.log(e);
        }
    };

    updateById = async (
        id,
        title,
        price,
        description,
        stock,
        thumbnail,
        category
    ) => {
        try {
            const products = await this.getAll();
            const item = products.find((prod) => prod.id === Number(id));
            if (item) {
                item.title = title;
                item.price = price;
                item.description = description;
                item.stock = stock;
                item.thumbnail = thumbnail;
                item.category = category;
                item.timestamp = new Date().toLocaleString();
                console.log(item);
                await fs.promises.writeFile(
                    this.filePath,
                    JSON.stringify(products, null, 2)
                );
                return item;
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = Container;
