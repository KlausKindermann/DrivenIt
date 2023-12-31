import { TicketStatus } from "@prisma/client";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsType() {
    const ticketTypes = await ticketsRepository.findTicketTypes();
    if (!ticketTypes) throw notFoundError();
    return ticketTypes;
}
async function getTicketByUserId(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
    return ticket;
}
async function createTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    };

    await ticketsRepository.createTicket(ticketData);
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    return ticket
}


const ticketService = { getTicketsType, getTicketByUserId, createTicket }
export default ticketService