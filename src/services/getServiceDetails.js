

export const getServicesDetais = async (id) => {
    const services = await fetch(`http://localhost:3000/services/api/${id}`);
    const res = services.json();
    return res;
};