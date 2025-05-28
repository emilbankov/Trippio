import axios from 'axios';

const baseUrl = "https://religious-josy-boklucite-a0b493a9.koyeb.app";

export const searchCountries = async (name: string) => {
    try {
        const response = await axios.get(`${baseUrl}/search/countries?name=${encodeURIComponent(name)}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
};

export const searchCities = async (country: string, name: string) => {
    try {
        const response = await axios.get(`${baseUrl}/search/cities?country=${encodeURIComponent(country)}&name=${encodeURIComponent(name)}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
    }
};

