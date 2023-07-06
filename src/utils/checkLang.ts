import { useAppSelector } from "../shared/hooks"

export const LangHandler = (ru: string, en: string) => {
    const lang = useAppSelector(state => state.app.lang)
    return lang === 'Ru' ? ru : en
}