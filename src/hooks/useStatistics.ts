import { useState } from 'react'
import { getStatistics } from '../services/statistics/StatisticsService.ts'
import type { StatisticResponseModel } from '../models/StatisticsModels.ts'

// Filters used in getGeneralGraphInfo

// Filters used in getSkillsGraphInfo
export type StatsFilters = {
    //level?: string -> not implemented yet
    period: string
    skill?: string
}


export function useStatistics() {

    const [statistics, setStatistics] = useState<StatisticResponseModel | null>(null); // object with all information
    const [currentPeriod, setCurrentPeriod] = useState<string>(""); // period being considered

    // Skills statistics
    const [skills, setSkills] = useState<string[]>([]) // array with the names of the skills (Kanji, Grammar, etc)
    const [skillsPercentages, setSkillsPercentages] = useState<number[]>([]) // array with the percentages of correct answers for each skill
    const [skillsAnswered, setSkillsAnswered] = useState<number[]>([]) // array with the total number of answered questions for each skill
    const [skillsCorrect, setSkillsCorrect] = useState<number[]>([]) // array with the number of correct answered questions for each skill

    // Tags statistics (filtered by skill)
    const [tags, setTags] = useState<string[]>([]) // array with the names of the tags
    const [tagsPercentages, setTagsPercentages] = useState<number[]>([]) // array with the percentages of correct answers for each tag
    const [tagsTotals, setTagsTotals] = useState<number[]>([]) // array with the total number of questions for each tag tag
    const [tagsAnswered, setTagsAnswered] = useState<number[]>([]) // array with the total number of answered questions for each tag
    const [tagsCorrect, setTagsCorrect] = useState<number[]>([]) // array with the number of correct answered questions for each tag

    // Timeline Statistics
    const [periodList, setPeriodList] = useState<string[]>([]); // list of strings saying the period the stats below refer to
    const [correctList, setCorrectList] = useState<number[]>([]); // list of correct questions in each period
    const [wrongList, setWrongList] = useState<number[]>([]); // list of wrong questions in each period

    // General Statistics
    const [totalQuestions, setTotalQuestions] = useState<number | null>(null); // total questions in database
    const [totalCorrect, setTotalCorrect] = useState<number | null>(null); // total correct answers
    const [totalWrong, setTotalWrong] = useState<number | null>(null); // total wrong answers
    const [totalAccuracy, setTotalAccuracy] = useState<number | null>(null); // accuracy of the user
    const [streak, setStreak] = useState<number | null>(null); // user streak



    // Loading and Error
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Fetches statistics - this function should always be called when the statistics page loads for the first time
    const loadStatistics = async (period: string) => {
        const response = await getStatistics(period);
        setCurrentPeriod(period);
        setStatistics(response);

        return response;
    }

    // Updates information about skills
    const setSkillsGraphInfo = (stat: StatisticResponseModel) => {
        setSkills(stat.skills.map(s => String(s.skill)));

        setSkillsCorrect(stat.skills.map(s => Number(s.correct)));

        setSkillsAnswered(stat.skills.map(s => Number(s.correct) + Number(s.wrong)));

        setSkillsPercentages(
            stat.skills.map(s =>
                (100 * Number(s.correct) ) / (Number(s.correct) + Number(s.wrong))
            )
        );
    }

    // Updates general information
    const setTagsInfo = (stat: StatisticResponseModel, skill: string) => {

        const tagInfo = stat.skillTags[skill] ?? [];
    
        setTags(tagInfo.map(t => String(t.tag) ));

        setTagsCorrect(tagInfo.map(t => Number(t.correct) ));

        setTagsAnswered(tagInfo.map(t => Number(t.correct) + Number(t.wrong) ));

        setTagsTotals(tagInfo.map(t => Number(t.correct) + Number(t.wrong)));

        setTagsPercentages(
            tagInfo.map(t =>
                (100 * Number(t.correct)) / (Number(t.correct) + Number(t.wrong))
            )
        );
    }

    // Updates general information
    const setGeneralInfo = (stat: StatisticResponseModel) => {

        setTotalQuestions(stat.database["totalQuestions"]);
        setTotalCorrect(stat.summary["correct"]);
        setTotalWrong(stat.summary["wrong"]);
        setTotalAccuracy(stat.summary["accuracy"]);
        setStreak(stat.summary["streak"]);
    }

    // checks if new fetch is needed
    const checkStats = async (period: string): Promise<StatisticResponseModel> => {
        let response: StatisticResponseModel;
        if (statistics == null || currentPeriod != period) {
            response = await loadStatistics(period)
        }
        else {
            response = statistics;
        }
        return response;
    }


    // Fetches skill information if necessary and updates it based on new filter
    const getSkillsGraphInfo = async (filters: StatsFilters): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await checkStats(filters.period)
            setSkillsGraphInfo(response)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível carregar as questões.')
        } finally {
            setIsLoading(false)
        }
    }

    // Fetches tags information if necessary and updates it based on new filter
    const getTagsGraphInfo = async (filters: StatsFilters): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            if (!filters.skill) {
                throw new Error("Skill não informada");
            }
            const response = await checkStats(filters.period)
            setTagsInfo(response, String(filters.skill));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível carregar as questões.')
        } finally {
            setIsLoading(false)
        }
    }

    // Fetches timeline information if necessary and updates it based on new filter
    const getTimeLine = async (filters: StatsFilters): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await checkStats(filters.period)

            setPeriodList(response.timeline.map(t => String(t.period)));
            setCorrectList(response.timeline.map(t => Number(t.correct)));
            setWrongList(response.timeline.map(t => Number(t.wrong)));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível carregar as questões.')
        } finally {
            setIsLoading(false)
        }
    }

    // Fetches general information if necessary and updates it based on new filter
    const getGeneralInfo = async (filters: StatsFilters): Promise<void> => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await checkStats(filters.period)
            setGeneralInfo(response)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível carregar as questões.')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        statistics,

        skills,
        skillsPercentages,
        skillsAnswered,
        skillsCorrect,
    
        tags,
        tagsPercentages,
        tagsTotals,
        tagsAnswered,
        tagsCorrect,
    
        periodList,
        correctList,
        wrongList,
    
        totalQuestions,
        totalCorrect,
        totalWrong,
        totalAccuracy,
        streak,
    
        isLoading,
        error,
    
        loadStatistics,
        getSkillsGraphInfo,
        getTagsGraphInfo,
        getTimeLine,
        getGeneralInfo,
    }


}