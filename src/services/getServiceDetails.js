

export const getServicesDetais = async (id) => {
    const services = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`);
    const res = services.json();
    return res;
};