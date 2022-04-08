export const CATEGORIES = {
    CAKE: 'Tortas',
    COOKIES: 'Galletas',
    CHOCOLAT: 'Chocolates',
    CANDY: 'Caramelos',
    JUICE: 'Jugos',
}

export const DefaultItems = [
    { 
        id: '1', name: "Budin de vainilla", initial: 1, stock: 10, steps: 1, categories: [CATEGORIES.CAKE],
        description: 'Esponjosa torta de vainilla y limon',
        price: 1500, creationTime: 1,
    },
    { 
        id: '2', name: "Galletas chocolate", initial: 10, stock: 100, steps: 10, categories: [CATEGORIES.COOKIES, CATEGORIES.CHOCOLAT],
        description: 'Set de galletas de chocolate, con chispas de chocolate blanco',
        price: 800, discount: 15, creationTime: 2,
    },
    { 
        id: '3', name: "Pie de limon", initial: 1, stock: 5, steps: 1, categories: [CATEGORIES.CAKE],
        description: 'Exquisito pie de limon, con tope de frutos del bosque y fondo de crocante galleta',
        price: 1600, discount: 20, creationTime: 3,
    },
    { 
        id: '4', name: "Cheesecake", initial: 1, stock: 6, steps: 1, categories: [CATEGORIES.CAKE],
        description: 'Deliciosa Cheesecake americana, con tope de frutilla ',
        price: 1400, creationTime: 2,
    },
    { 
        id: '5', name: "Chocotorta", initial: 1, stock: 15, steps: 1, categories: [CATEGORIES.CAKE, CATEGORIES.CHOCOLAT],
        description: 'Deliciosa torta creada con crema de chocolate, dulce de leche y galletas de vainilla',
        price: 1300, discount: 10, creationTime: 3,
    },
    { 
        id: '6', name: "Caramelos de Menta", initial: 20, stock: 200, steps: 20, categories: [CATEGORIES.CANDY],
        description: 'Surtido de caramelos de menta y gengibre',
        price: 500, creationTime: 1,
    },
    { 
        id: '7', name: "Chocolate Amargo", initial: 5, stock: 60, steps: 5, categories: [CATEGORIES.CHOCOLAT],
        description: 'Set de barras de chocolate oscuro importado',
        price: 700, creationTime: 1,
    },
    { 
        id: '8', name: "Jugo de Manzana", initial: 1, stock: 11, steps: 1, categories: [CATEGORIES.JUICE],
        description: 'Litro de jugo de manzana natural, envasado y sin conservantes',
        price: 600, discount: 10, creationTime: 2,
    },
    { 
        id: '9', name: "Chocolate Blanco", initial: 5, stock: 60, steps: 5, categories: [CATEGORIES.CHOCOLAT],
        description: 'Increibles barras de chocolate blanco, deliciosas y unicas',
        price: 700, discount: 10, creationTime: 1,
    },
    { 
        id: '10', name: "Galletas Surtidas", initial: 10, stock: 100, steps: 10, categories: [CATEGORIES.COOKIES],
        description: 'Set de galletas surtidas, de chispas de chocolate, vainilla y frutilla',
        price: 1000, discount: 15, creationTime: 2,
    },
    { 
        id: '11', name: "Polvorones", initial: 10, stock: 100, steps: 10, categories: [CATEGORIES.COOKIES],
        description: 'Dulces galletas secas, crocantes y espolboreadas con azucar nevada',
        price: 1200, creationTime: 4,
    },
    { 
        id: '12', name: "Caramelos de Frutilla", initial: 20, stock: 260, steps: 10, categories: [CATEGORIES.CANDY],
        description: 'Caramelos artesanales de frutilla, de diversos tamaños y formas',
        price: 800, creationTime: 3,
    },
    { 
        id: '13', name: "Jugo de Naranja", initial: 1, stock: 11, steps: 1, categories: [CATEGORIES.JUICE],
        description: 'Unn litro de jugo natural de naranja dulce, recien exprimido y envasado',
        price: 400, creationTime: 1,
    },
    { 
        id: '14', name: "Leche Chocolatada", initial: 1, stock: 20, steps: 1, categories: [CATEGORIES.JUICE, CATEGORIES.CHOCOLAT],
        description: 'Un litro de bebida a base de leche con sabor a chocolate',
        price: 1100, creationTime: 1,
    },
    { 
        id: '15', name: "Jugo de Frutilla", initial: 1, stock: 11, steps: 1, categories: [CATEGORIES.JUICE],
        description: 'Un litro de jugo de frutilla, endulsado y envasado',
        price: 400, creationTime: 1,
    },
    { 
        id: '16', name: "Caramelos Surtidos", initial: 20, stock: 260, steps: 10, categories: [CATEGORIES.CANDY],
        description: 'Caramelos surtidos de todos los sabores',
        price: 500, discount: 10, creationTime: 1,
    },
  ]