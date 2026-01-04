export class CreateAnalyticsDto {
    userId: string;
    startTime: string; // ISO Date string
    endTime: string;
    duration: number; // in seconds
    activityScore: number;
}
