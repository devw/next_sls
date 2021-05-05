const { createCustomAPI } = require("@utils/Global.utils");
const instance = createCustomAPI({}, "/admin");

/* *********************************************** */
/*              Custom API Controller              */
/* *********************************************** */

/**
 * Shop settings
 */

export async function getSettings() {
    try {
        const { data, error } = await instance.get("/get_settings");

        if (error) throw error;

        return {
            is_popup_enabled: data.is_popup_enabled,
            total_sessions: data.total_sessions,
        };
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
}

const updatePopupStatus = async (enabled) => {
    try {
        const obj = {
            update_key: "is_popup_enabled",
            update_value: enabled,
        };

        const request = await instance.post("/update_settings", obj);
        const { data, error } = request;

        if (error) throw error;
        else if (!data.status || data.status === "ko") {
            throw {
                message: "Request rejected (status: ko or undefined)",
                data,
            };
        }

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Cookiebot settings
 */

const getCookiebotSettings = async () => {
    try {
        const { data, error } = await instance.get("/get_settings");

        if (error) throw error;

        return data.cookiebot;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

const updateCookiebotSettings = async (settings) => {
    try {
        const obj = {
            update_key: "cookiebot",
            update_value: settings,
        };

        const request = await instance.post("/update_settings", obj);
        const { data, error } = request;

        if (error) throw error;
        else if (!data.status || data.status === "ko") {
            throw {
                message: "Request rejected (status: ko or undefined)",
                data,
            };
        }

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Global settings
 */

const getGlobalSettings = async () => {
    try {
        const { data, error } = await instance.get("/get_settings");

        if (error) throw error;

        return {
            shopify_page_ids: data.shopify_page_ids || [],
            ...data.global,
        };
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

const updateGlobalSettings = async (settings) => {
    try {
        const obj = {
            update_key: "global",
            update_value: settings,
        };

        const request = await instance.post("/update_settings", obj);
        const { data, error } = request;

        if (error) throw error;
        else if (!data.status || data.status === "ko") {
            throw {
                message: "Request rejected (status: ko or undefined)",
                data: obj,
                instance,
            };
        }

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Personalize popup
 */

const getPopupData = async () => {
    try {
        const { data, error } = await instance.get("/get_settings");

        if (error) throw error;

        return data.popup;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

const updatePopupData = async (popupData) => {
    try {
        const obj = {
            update_key: "popup",
            update_value: popupData,
        };

        const request = await instance.post("/update_settings", obj);
        const { data, error } = request;

        if (error) throw error;
        else if (!data.status || data.status === "ko") {
            throw {
                message: "Request rejected (status: ko or undefined)",
                data: obj,
                instance,
            };
        }

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Regulation requests
 */

const getRegulationRequests = async (lastEvaluatedKey) => {
    try {
        const { data, error } = await instance.get("/list_requests", {
            params: {
                types: "rectification,access,portability",
                last_evaluated_key: lastEvaluatedKey || null,
            },
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Deletion requests
 */

const getDeletionRequests = async (lastEvaluatedKey) => {
    try {
        const { data, error } = await instance.get("/list_requests", {
            params: {
                types: "erasure",
                last_evaluated_key: lastEvaluatedKey || null,
            },
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

/**
 * Update requests
 */

const updateRequest = async (requestId, isChecked) => {
    console.log("---requestId---", requestId, isChecked);
    try {
        const { data, error } = await instance.post("/update_request", {
            request_id: requestId || null,
            update_value: isChecked || false,
        });

        if (error) throw error;

        return data;
    } catch (error) {
        console.log("[API ERROR]", error);
        return false;
    }
};

// Export the API
export default {
    getSettings,
    updatePopupStatus,
    getCookiebotSettings,
    updateCookiebotSettings,
    getGlobalSettings,
    updateGlobalSettings,
    getPopupData,
    updatePopupData,
    getRegulationRequests,
    getDeletionRequests,
    updateRequest,
};
