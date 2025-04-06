import axios from "axios";
import { BASE_URL, RELEASE_RANDOM, RELEASE, RELEASE_FILTER } from "../endpoints";

const StatusList: Record<string, null | number> = {
    last: null,
    finished: 1,
    ongoing: 2,
    announce: 3,
};

export const profile_lists = {
    0: { name: "Не смотрю", bg_color: "rgb(39, 39, 39)" },
    1: { name: "Смотрю", bg_color: "rgb(26, 212, 85)" },
    2: { name: "В планах", bg_color: "rgb(140, 119, 197)" },
    3: { name: "Просмотрено", bg_color: "rgb(91, 93, 207)" },
    4: { name: "Отложено", bg_color: "rgb(233, 196, 47)" },
    5: { name: "Брошено", bg_color: "rgb(231, 115, 80)" },
};

export const lists = [
    { list: 0, name: "Не смотрю" },
    { list: 1, name: "Смотрю" },
    { list: 2, name: "В планах" },
    { list: 3, name: "Просмотрено" },
    { list: 4, name: "Отложено" },
    { list: 5, name: "Брошено" },
];

export const weekDay = [
    "_",
    "каждый понедельник",
    "каждый вторник",
    "каждую среду",
    "каждый четверг",
    "каждую пятницу",
    "каждую субботу",
    "каждое воскресенье",
];

class ReleaseService {

    async getRandomRelease() {

        const url = `${BASE_URL}${RELEASE_RANDOM}`

        const randomRelease = await axios.get(url);

        return randomRelease;
    }

    async getCurrentRelease(
        id: number | string,
        token: string | null,
    ) {
        const url = `${BASE_URL}${RELEASE}${id}?token=${token}`;

        const currentRelease = await axios.get(url);

        return currentRelease;
    }

    async getLastUpdatedReleases(
        status: string,
        token: string | null,
        page: string | number = 0,
        sort: null | number = 0
    ) {

        let statusId: null | number = null;
        let categoryId: null | number = null;
        if (status == "films") {
          categoryId = 2;
        } else {
          statusId = StatusList[status];
        }

        if (status == "ova") {
            categoryId = 3;
        }

        const data = {
            age_ratings: [],
            category_id: categoryId,
            country: null,
            end_year: null,
            episode_duration_from: null,
            episode_duration_to: null,
            episodes_from: null,
            episodes_to: null,
            genres:[],
            is_genres_exclude_mode_enabled: false,
            profile_list_exclusions: [],
            season: null,
            sort: sort,
            start_year: null,
            status_id: statusId,
            studio : null,
            types:[]
        };

        let url = `${BASE_URL}${RELEASE_FILTER}${page}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const lastUpdatedReleases = await axios.post(url, data);
        
        return lastUpdatedReleases;
    }

}

export const releaseService = new ReleaseService();