export const  DOMAIN = "svitlo_live"

// # Фіксований інтервал опитування (сек)
export const  DEFAULT_SCAN_INTERVAL = 900


export const  CONF_REGION = "region"
export const  CONF_QUEUE = "queue"

// Оновлений список (Херсонська прибрана)
export const  REGIONS = {
    "cherkaska-oblast": "Черкаська область",
    "chernigivska-oblast": "Чернігівська область",
    "chernivetska-oblast": "Чернівецька область",
    "dnipropetrovska-oblast": "Дніпропетровська область",
    "donetska-oblast": "Донецька область",
    "harkivska-oblast": "Харківська область",
    "hersonska-oblast": "Херсонська область",
    "hmelnitska-oblast": "Хмельницька область",
    "ivano-frankivska-oblast": "Івано-Франківська область",
    "kirovogradska-oblast": "Кіровоградська область",
    "kyiv": "Київ",
    "kiivska-oblast": "Київська область",
    "lvivska-oblast": "Львівська область",
    "mikolaivska-oblast": "Миколаївська область",
    "odeska-oblast": "Одеська область",
    "poltavska-oblast": "Полтавська область",
    "rivnenska-oblast": "Рівненська область",
    "sumska-oblast": "Сумська область",
    "ternopilska-oblast": "Тернопільська область",
    "vinnitska-oblast": "Вінницька область",
    "volinska-oblast": "Волинська область",
    "zakarpatska-oblast": "Закарпатська область",
    "zaporizka-oblast": "Запорізька область",
    "jitomirska-oblast": "Житомирська область",
}

// Мапа режимів вибору черги/групи
export const  REGION_QUEUE_MODE = {
    "vinnitska-oblast": "CHERGA_NUM",
    "chernivetska-oblast": "GRUPA_NUM",
    "donetska-oblast": "GRUPA_NUM",
}

// # Публічний URL твого Cloudflare Worker (без секретів)
export const  API_URL = "https://svitlo-proxy.svitlo-proxy.workers.dev"