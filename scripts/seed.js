

const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Musique" },
                { name: "Informatique" },
                { name: "Jardinage" },
                { name: "Cuisine" },
            ]
        })
        
        console.log("Database seeded successfully")
    } catch (error) {
        console.log("An error occurred in seeding database categories", error)
        throw error
    } finally {
        await db.$disconnect()
    }
}


main()