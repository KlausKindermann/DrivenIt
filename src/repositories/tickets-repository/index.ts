import { prisma } from "@/config";
import { createTicketParams } from "@/protocols";

async function findTicketTypes() {
    return prisma.ticketType.findMany();
}
async function findTicketByEnrollmentId(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: {
            TicketType: true,
        }
    });
}
async function createTicket(ticket: createTicketParams) {
    return prisma.ticket.create({
        data: {
            ...ticket
        },
    }
    );
}
export default { findTicketTypes, findTicketByEnrollmentId, createTicket };