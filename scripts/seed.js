

const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Music" },
                { name: "Engineering" },
                { name: "Film" },
                { name: "Sports" },
                { name: "Business" },
                { name: "Business & Finance" },
                { name: "Reading" },
                { name: "Education" },
                { name: "Technology" },
                { name: "Science" },
                { name: "Health" },
                { name: "Art" },
                { name: "Fashion" },
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