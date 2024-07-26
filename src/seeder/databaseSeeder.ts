import { AppDataSource } from "../data-source";
import { Client } from "../entity/Client";
import { BalanceSheet } from "../entity/BalanceSheet";


const clientData = [
    { id: 1, firstName: "Jean", lastName: "Dupont" },
    { id: 2, firstName: "Marie", lastName: "Martin" },
    { id: 3, firstName: "Pierre", lastName: "Bernard" },
    { id: 4, firstName: "Jean", lastName: "Dupont" },
    { id: 5, firstName: "Isabelle", lastName: "Thomas" },
    { id: 6, firstName: "Michel", lastName: "Dubois" },
    { id: 7, firstName: "Michel", lastName: "Dubois" },
    { id: 8, firstName: "Catherine", lastName: "Robert" },
    { id: 9, firstName: "Philippe", lastName: "Petit" },
    { id: 10, firstName: "Sophie", lastName: "Richard" },
    { id: 11, firstName: "Jacques", lastName: "Roux" },
    { id: 12, firstName: "Nathalie", lastName: "Lefebvre" },
    { id: 13, firstName: "François", lastName: "Girard" },
    { id: 14, firstName: "Martine", lastName: "Moreau" },
    { id: 15, firstName: "Eric", lastName: "Laurent" },
    { id: 16, firstName: "Caroline", lastName: "Simon" },
    { id: 17, firstName: "Thierry", lastName: "Leclerc" },
    { id: 18, firstName: "Sophie", lastName: "Richard" },
    { id: 19, firstName: "Valérie", lastName: "Lecomte" },
    { id: 20, firstName: "Patrick", lastName: "Fournier" },
    { id: 21, firstName: "Eric", lastName: "Laurent" },
    { id: 22, firstName: "Eric", lastName: "Laurent" },
    { id: 23, firstName: "Sylvie", lastName: "Mercier" },
    { id: 24, firstName: "Sébastien", lastName: "Garcia" },
    { id: 25, firstName: "Pierre", lastName: "Bernard" },
    { id: 26, firstName: "Anne", lastName: "David" },
];

const balanceSheetData = [
    { year: 2020, clientId: 1, result: 4099.42 },
    { year: 2020, clientId: 3, result: -263.82 },
    { year: 2020, clientId: 4, result: 896.16 },
    { year: 2020, clientId: 6, result: -545.69 },
    { year: 2020, clientId: 7, result: 3891.78 },
    { year: 2020, clientId: 8, result: 4082.13 },
    { year: 2020, clientId: 9, result: -65.27 },
    { year: 2020, clientId: 10, result: 1960.36 },
    { year: 2020, clientId: 11, result: 2688.73 },
    { year: 2020, clientId: 12, result: -1553.67 },
    { year: 2020, clientId: 13, result: 4304.97 },
    { year: 2020, clientId: 14, result: -2546.61 },
    { year: 2020, clientId: 15, result: 2811.08 },
    { year: 2020, clientId: 17, result: -4239.36 },
    { year: 2020, clientId: 18, result: 1960.36 },
    { year: 2020, clientId: 19, result: 1358.84 },
    { year: 2020, clientId: 20, result: 3.26 },
    { year: 2020, clientId: 22, result: 789.04 },
    { year: 2020, clientId: 23, result: -4624.04 },
    { year: 2020, clientId: 24, result: -4956.91 },
    { year: 2020, clientId: 25, result: -263.82 },
    { year: 2020, clientId: 26, result: -4235.8 },
    { year: 2021, clientId: 1, result: 3848.44 },
    { year: 2021, clientId: 2, result: -4551.66 },
    { year: 2021, clientId: 3, result: 2056.85 },
    { year: 2021, clientId: 4, result: -814.82 },
    { year: 2021, clientId: 5, result: -1086.87 },
    { year: 2021, clientId: 6, result: -1796.77 },
    { year: 2021, clientId: 7, result: -3253.84 },
    { year: 2021, clientId: 8, result: 4472.47 },
    { year: 2021, clientId: 9, result: 2618.75 },
    { year: 2021, clientId: 10, result: 961.74 },
    { year: 2021, clientId: 11, result: 2758.75 },
    { year: 2021, clientId: 12, result: 3351.74 },
    { year: 2021, clientId: 13, result: 1186.95 },
    { year: 2021, clientId: 14, result: 633.78 },
    { year: 2021, clientId: 15, result: -3757 },
    { year: 2021, clientId: 16, result: -4985.44 },
    { year: 2021, clientId: 17, result: -688.41 },
    { year: 2021, clientId: 18, result: 961.74 },
    { year: 2021, clientId: 19, result: -4663.99 },
    { year: 2021, clientId: 20, result: -3086.73 },
    { year: 2021, clientId: 21, result: -3757 },
    { year: 2021, clientId: 22, result: -1254.95 },
    { year: 2021, clientId: 23, result: -2215 },
    { year: 2021, clientId: 24, result: -3093.7 },
    { year: 2021, clientId: 25, result: 2056.85 },
    { year: 2021, clientId: 26, result: -224.75 },
    { year: 2022, clientId: 1, result: -3285.74 },
    { year: 2022, clientId: 2, result: 2460.75 },
    { year: 2022, clientId: 3, result: -4817.31 },
    { year: 2022, clientId: 4, result: 3343.25 },
    { year: 2022, clientId: 5, result: 1937.78 },
    { year: 2022, clientId: 6, result: -1146.05 },
    { year: 2022, clientId: 7, result: 4946.35 },
    { year: 2022, clientId: 8, result: 4426.75 },
    { year: 2022, clientId: 9, result: 2719.68 },
    { year: 2022, clientId: 10, result: -717.21 },
    { year: 2022, clientId: 11, result: -1298.32 },
    { year: 2022, clientId: 12, result: -2229.21 },
    { year: 2022, clientId: 13, result: -4456.74 },
    { year: 2022, clientId: 14, result: -3094.83 },
    { year: 2022, clientId: 15, result: 4467.98 },
    { year: 2022, clientId: 16, result: -1801.25 },
    { year: 2022, clientId: 17, result: -4734.23 },
    { year: 2022, clientId: 19, result: 107.08 },
    { year: 2022, clientId: 20, result: -145.64 },
    { year: 2022, clientId: 21, result: 4467.98 },
    { year: 2022, clientId: 22, result: 2645.41 },
    { year: 2022, clientId: 23, result: -3816.99 },
    { year: 2022, clientId: 24, result: 1496.14 },
    { year: 2022, clientId: 25, result: -4817.31 },
    { year: 2022, clientId: 26, result: -3962.65 },
    { year: 2023, clientId: 1, result: -1759.05 },
    { year: 2023, clientId: 2, result: 3951.81 },
    { year: 2023, clientId: 3, result: 2952.21 },
    { year: 2023, clientId: 4, result: -2489.64 },
    { year: 2023, clientId: 6, result: -2977.82 },
    { year: 2023, clientId: 7, result: -2338.14 },
    { year: 2023, clientId: 8, result: 4220.42 },
    { year: 2023, clientId: 9, result: 1993.21 },
    { year: 2023, clientId: 10, result: -3182.6 },
    { year: 2023, clientId: 11, result: 1916.55 },
    { year: 2023, clientId: 12, result: 167.4 },
    { year: 2023, clientId: 13, result: -2823.55 },
    { year: 2023, clientId: 14, result: 2964.02 },
    { year: 2023, clientId: 15, result: 365.63 },
    { year: 2023, clientId: 16, result: 326.4 },
    { year: 2023, clientId: 19, result: 3399.79 },
    { year: 2023, clientId: 20, result: -4213.82 },
    { year: 2023, clientId: 21, result: 365.63 },
    { year: 2023, clientId: 22, result: 3160.66 },
    { year: 2023, clientId: 23, result: 2710.02 },
    { year: 2023, clientId: 24, result: -1475.19 },
    { year: 2023, clientId: 25, result: 2952.21 }
];

const seedDatabase = async () => {

    await AppDataSource.initialize();
    await AppDataSource.synchronize();

    const clientRepo = AppDataSource.getRepository(Client);
    const balanceSheetRepo = AppDataSource.getRepository(BalanceSheet);

    for (const client of clientData) {
        const existingClient = await clientRepo.findOne({ where: { id: client.id } });
        if (!existingClient) {
            await clientRepo.save(client);
        }
    }

    for (const balanceSheet of balanceSheetData) {
        const existingBalanceSheet = await balanceSheetRepo.findOne({
            where: { year: balanceSheet.year, client: { id: balanceSheet.clientId } },
        });

        if (!existingBalanceSheet) {
            const client = await clientRepo.findOne({ where: { id: balanceSheet.clientId } });
            if (client) {
                await balanceSheetRepo.save({ ...balanceSheet, client });
            }
        }
    }
};

seedDatabase()
    .then(() => {
        console.log("Database seeded successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding database:", error);
        process.exit(1);
    });
