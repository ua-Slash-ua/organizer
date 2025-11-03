'use client'


// Отримати конфіг
import {getTimerConfig, saveTimerConfig, updateTimerConfig} from "@/front-end/api/timer.server";
import {TimerConfigType} from "@/front-end/configs/timer.config";

export async function fetchTimerConfig() {
    try {
        const data = await getTimerConfig()
        if (!data) throw new Error('Не вдалося отримати конфігурацію')
        return data
    } catch (error) {
        console.error('Помилка отримання конфігурації:', error)
        return null
    }
}

// Зберегти нову конфігурацію
export async function saveTimer(config: TimerConfigType) {
    try {
        const res = await saveTimerConfig(config as never)
        if (!res.success) throw new Error(res.error || 'Помилка збереження')
        return true
    } catch (error) {
        console.error('Помилка збереження таймера:', error)
        return false
    }
}

// Оновити існуючу конфігурацію
export async function updateTimer(config: TimerConfigType) {
    try {
        const res = await updateTimerConfig(config as never)
        if (!res.success) throw new Error(res.error || 'Помилка оновлення')
        return true
    } catch (error) {
        console.error('Помилка оновлення таймера:', error)
        return false
    }
}
