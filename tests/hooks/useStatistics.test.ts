import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStatistics } from '../../src/hooks/useStatistics'
import { getStatistics } from '../../src/services/statistics/StatisticsService'
import type { StatisticResponseModel } from '../../src/models/StatisticsModels'


vi.mock('../../src/services/statistics/StatisticsService', () => ({
	getStatistics: vi.fn(),
}))

const mockedStatistics = {
    "summary": {
        "answered": 100000,
        "correct": 99999,
        "incorrect": 1,
        "accuracy": 99.999,
        "streak": 18
    },
  
    "skills": [
        {
            "skill": "Grammar",
            "correct": 100,
            "incorrect": 37
        },
        {
            "skill": "Kanji",
            "correct": 200,
            "incorrect": 100
        }
    ],
  
    "skillTags": {
        "Grammar": [
            {
                "tag": "Particles",
                "correct": 30,
                "incorrect": 5
            },
            {
                "tag": "Verb Conjugation",
                "correct": 27,
                "incorrect": 9
            }
        ],
        "Kanji": [
            {
                "tag": "Stroke order",
                "correct": 30,
                "incorrect": 5
            },
            {
                "tag": "Radicals",
                "correct": 27,
                "incorrect": 3
            }
        ]
    },
  
    "timeline": [
        {
            "period": "2026-07-15",
            "correct": 32,
            "incorrect": 8
        },
        {
            "period": "2026-07-16",
            "correct": 41,
            "incorrect": 6
        }
    ],
  
    "database": {
        "levels": {
            "N5": 1024
        },
        "question_types": {
            "grammar": 300,
            "kanji": 190,
        },
        "tags": {
            "Compreensão de Pontos": 44,
            "Compreensão do Assunto": 41,
        }
    }
}

const mockedStatisticsWeek = {
    "summary": {
        "answered": 1000,
        "correct": 999,
        "incorrect": 1,
        "accuracy": 99.9,
        "streak": 18
    },
  
    "skills": [
        {
            "skill": "Grammar",
            "correct": 7,
            "incorrect": 3
        },
        {
            "skill": "Kanji",
            "correct": 20,
            "incorrect": 20
        }
    ],
  
    "skillTags": {
        "Grammar": [
            {
                "tag": "Particles",
                "correct": 20,
                "incorrect": 5
            },
            {
                "tag": "Verb Conjugation",
                "correct": 27,
                "incorrect": 3
            }
        ],
        "Kanji": [
            {
                "tag": "Stroke order",
                "correct": 20,
                "incorrect": 2
            },
            {
                "tag": "Radicals",
                "correct": 20,
                "incorrect": 1
            }
        ]
    },
  
    "timeline": [
        {
            "period": "2026-07-17",
            "correct": 31,
            "incorrect": 4
        },
        {
            "period": "2026-07-18",
            "correct": 40,
            "incorrect": 4
        }
    ],
  
    "database": {
            "levels": {
                "N5": 1024
            },
            "question_types": {
                "grammar": 300,
                "kanji": 190,
            },
            "tags": {
                "Compreensão de Pontos": 44,
                "Compreensão do Assunto": 41,
            }
    }
}

const mockedStatisticsN4 = {
    "summary": {
        "answered": 1000,
        "correct": 999,
        "incorrect": 1,
        "accuracy": 99.9,
        "streak": 18
    },
  
    "skills": [
        {
            "skill": "Grammar",
            "correct": 27,
            "incorrect": 3
        },
        {
            "skill": "Kanji",
            "correct": 0,
            "incorrect": 0
        }
    ],
  
    "skillTags": {
        "Grammar": [
            {
                "tag": "Particles",
                "correct": 20,
                "incorrect": 5
            },
            {
                "tag": "Verb Conjugation",
                "correct": 27,
                "incorrect": 3
            }
        ],
        "Kanji": [
            {
                "tag": "Stroke order",
                "correct": 3,
                "incorrect": 2
            },
            {
                "tag": "Radicals",
                "correct": 0,
                "incorrect": 0
            }
        ]
    },
  
    "timeline": [
        {
            "period": "2026-07-17",
            "correct": 31,
            "incorrect": 4
        },
        {
            "period": "2026-07-18",
            "correct": 1,
            "incorrect": 1
        }
    ],
  
    "database": {
        "levels": {
            "N4": 490
        },
        "question_types": {
            "grammar": 300,
            "kanji": 190,
        },
        "tags": {
            "Compreensão de Pontos": 44,
            "Compreensão do Assunto": 41,
        }
    }
}

describe('useStatistics', () => {
    beforeEach(() => {
		vi.clearAllMocks()
	})

    it('starts with the correct initial state', () => {
        const { result } = renderHook(() => useStatistics())

        expect(result.current.statistics).toBeNull()
		expect(result.current.skills).toEqual([])
		expect(result.current.skillsPercentages).toEqual([])
        expect(result.current.skillsAnswered).toEqual([])
        expect(result.current.skillsCorrect).toEqual([])
        expect(result.current.tags).toEqual([])
        expect(result.current.tagsPercentages).toEqual([])
        expect(result.current.tagsAnswered).toEqual([])
        expect(result.current.tagsCorrect).toEqual([])
        expect(result.current.periodList).toEqual([])
        expect(result.current.correctList).toEqual([])
        expect(result.current.wrongList).toEqual([])
        expect(result.current.totalQuestions).toBeNull()
        expect(result.current.totalCorrect).toBeNull()
        expect(result.current.totalWrong).toBeNull()
        expect(result.current.totalAccuracy).toBeNull()
        expect(result.current.streak).toBeNull()
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBeNull()
        
    })

    it('loads statistics', async () => {
		vi.mocked(getStatistics).mockResolvedValue(mockedStatistics)

		const { result } = renderHook(() => useStatistics())

        let returnedValue: StatisticResponseModel | undefined = undefined;
		await act(async () => {
			returnedValue = await result.current.loadStatistics({
                period: 'month',
				level: 'N5',
			})
		})

		expect(getStatistics).toHaveBeenCalledOnce()
        expect(getStatistics).toHaveBeenCalledWith("month", "N5")
        expect(result.current.statistics).toEqual(mockedStatistics)
        expect(returnedValue).toEqual(mockedStatistics)
	})


    it('tests getSkillsGraphInfo', async () => {
        vi.mocked(getStatistics).mockResolvedValue(mockedStatistics)

        const { result } = renderHook(() => useStatistics())

        // tests if values are correctly set

        await act(async () => {
            await result.current.getSkillsGraphInfo({
                period: "month",
                level: "N5"
            })
        })

        expect(getStatistics).toHaveBeenCalledOnce()
        expect(result.current.skills).toEqual(["Grammar", "Kanji"])
        expect(result.current.skillsCorrect).toEqual([100, 200])
        expect(result.current.skillsAnswered).toEqual([137, 300])
        expect(result.current.skillsPercentages[0]).toBeCloseTo(72.992700729)
        expect(result.current.skillsPercentages[1]).toBeCloseTo(66.666666667)

        // tests if statistics won't be loaded twice without need
        vi.mocked(getStatistics).mockResolvedValue(mockedStatisticsWeek)
        await act(async () => {
            await result.current.getSkillsGraphInfo({
                period: "month",
                level: "N5"
            })
        })

        expect(getStatistics).toHaveBeenCalledOnce()
        expect(result.current.skills).toEqual(["Grammar", "Kanji"])
        expect(result.current.skillsCorrect).toEqual([100, 200])
        expect(result.current.skillsAnswered).toEqual([137, 300])
        expect(result.current.skillsPercentages[0]).toBeCloseTo(72.992700729)
        expect(result.current.skillsPercentages[1]).toBeCloseTo(66.666666667)


        // checks that statistics will be loaded if there are changes

        await act(async () => {
            await result.current.getSkillsGraphInfo({
                period: "week",
                level: "N5"
            })
        })

        expect(getStatistics).toHaveBeenCalledTimes(2)
        expect(result.current.skills).toEqual(["Grammar", "Kanji"])
        expect(result.current.skillsCorrect).toEqual([7, 20])
        expect(result.current.skillsAnswered).toEqual([10, 40])
        expect(result.current.skillsPercentages[0]).toBeCloseTo(70.0)
        expect(result.current.skillsPercentages[1]).toBeCloseTo(50.0)

        vi.mocked(getStatistics).mockResolvedValue(mockedStatisticsN4)
        await act(async () => {
            await result.current.getSkillsGraphInfo({
                period: "week",
                level: "N4"
            })
        })

        expect(getStatistics).toHaveBeenCalledTimes(3)
        expect(result.current.skills).toEqual(["Grammar", "Kanji"])
        expect(result.current.skillsCorrect).toEqual([27, 0])
        expect(result.current.skillsAnswered).toEqual([30, 0])
        expect(result.current.skillsPercentages[0]).toBeCloseTo(90.0)
        expect(result.current.skillsPercentages[1]).toBeCloseTo(0.0)
        expect(result.current.isLoading).toBe(false)

    })


    it('tests getTagsGraphInfo', async () => {
        vi.mocked(getStatistics).mockResolvedValue(mockedStatistics)

        const { result } = renderHook(() => useStatistics())

        // tests if values are correctly set
        await act(async () => {
            await result.current.getTagsGraphInfo({
                period: "month",
                level: "N5",
                skill: "Kanji"
            })
        })

        expect(result.current.tags).toEqual(["Stroke order", "Radicals"])
        expect(result.current.tagsCorrect).toEqual([30,27])
        expect(result.current.tagsAnswered).toEqual([35,30])
        expect(result.current.tagsPercentages[0]).toBeCloseTo(85.71)
        expect(result.current.tagsPercentages[1]).toBeCloseTo(90)
        expect(result.current.isLoading).toBe(false)

        // tests error in case user doesn't inform skill
        await act(async () => {
            await result.current.getTagsGraphInfo({
                period: "month",
                level: "N5",
            })
        })
        expect(result.current.error).toBe("Skill não informada.")


    })

    it('tests getTimeLine', async () => {
        vi.mocked(getStatistics).mockResolvedValue(mockedStatisticsWeek)

        const { result } = renderHook(() => useStatistics())

        await act(async () => {
            await result.current.getTimeLine({
                period: "week",
                level: "N5"
            })
        })


        expect(result.current.periodList).toEqual(["2026-07-17", "2026-07-18"])
        expect(result.current.correctList).toEqual([31, 40])
        expect(result.current.wrongList).toEqual([4,4])
        expect(result.current.isLoading).toBe(false)
    })


    it('gets general statistics information', async () => {
        vi.mocked(getStatistics).mockResolvedValue(mockedStatisticsN4)

        const { result } = renderHook(() => useStatistics())

        await act(async () => {
            await result.current.getGeneralInfo({
                period: "week",
                level: "N4"
            })
        })

        expect(result.current.totalCorrect).toBe(999)
        expect(result.current.totalWrong).toBe(1)
        expect(result.current.totalAccuracy).toBe(99.9)
        expect(result.current.streak).toBe(18)
        expect(result.current.totalQuestions).toBe(490)
        expect(result.current.isLoading).toBe(false)
    })

})
    
