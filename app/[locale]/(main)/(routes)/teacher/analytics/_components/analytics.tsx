"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useI18n } from '@/locales/client'



type Props = {
    monthlyRevenue: {
        month: string
        revenue: number
    }[]
    studentEnrollment: {
        month: string;
        enrollment: number;
    }[]
    coursesWithChapters: {
        title: string;
        chapters: number;
    }[]
    coursePerformance: {
        title: string;
        students: number;
        percentage: number;
    }[]
}

const Analytics = ({ monthlyRevenue, studentEnrollment, coursesWithChapters, coursePerformance } : Props) => {

    
    const t = useI18n()

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t("monthly_revenue")}</CardTitle>
                    <CardDescription>{t("monthly_revenue_description")} {new Date().getFullYear()} in $</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        revenue: {
                            label: "Revenue",
                            color: "hsl(var(--chart-1))",
                        } as ChartConfig
                    }}>
                        <LineChart
                            accessibilityLayer
                            data={monthlyRevenue}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="revenue"
                                type="natural"
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-revenue)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>{t("courses")}</CardTitle>
                <CardDescription>{t("courses_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        chapters: {
                        label: "Chapters",
                        color: "hsl(var(--chart-1))",
                        } as ChartConfig
                    }}>
                        <BarChart
                            accessibilityLayer
                            data={coursesWithChapters}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="title"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 12)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="chapters" fill="var(--color-chapters)" radius={8}>
                                <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t("course_performance")}</CardTitle>
                    <CardDescription>{t("course_performance_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        students: {
                            label: "Students",
                            color: "hsl(var(--chart-1))",
                        } as ChartConfig
                    }}>
                        <BarChart
                            accessibilityLayer
                            data={coursePerformance}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="title"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 12)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="students" fill="var(--color-students)" radius={8}>
                                <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{t("student_enrollment")}</CardTitle>
                    <CardDescription>{t("student_enrollment_description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{
                        students: {
                            label: "Students",
                            color: "hsl(var(--chart-1))",
                        } as ChartConfig
                    }}>
                    <LineChart
                        accessibilityLayer
                        data={studentEnrollment}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="enrollment"
                            type="natural"
                            stroke="var(--color-students)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-students)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default Analytics