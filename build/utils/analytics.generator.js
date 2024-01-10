"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MothsData = void 0;
async function generateLast12MothsData(model) {
    const last12Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);
        const monthYear = endDate.toLocaleString("default", { day: "numeric", month: "short", year: "numeric" });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            }
        });
        last12Months.push({ month: monthYear, count });
    }
    ;
    return { last12Months };
}
exports.generateLast12MothsData = generateLast12MothsData;
