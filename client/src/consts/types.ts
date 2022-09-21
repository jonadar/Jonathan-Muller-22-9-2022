export type NavigationObject = Array<{ path: string, name: string }>

export type AutocompleteData = {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string,
    },
    AdministrativeArea: {
        ID: string,
        LocalizedName: string,
    }
}

export type CityWeatherData = {
    LocalObservationDateTime: string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    HasPrecipitation: boolean,
    PrecipitationType: string | null,
    LocalSource: {
        Id: number,
        Name: string,
        WeatherCode: string,
    },
    IsDayTime: boolean,
    Temperature: Record<"Metric" | "Imperial", Temperature>,
    MobileLink: string,
    Link: string
}


export type CityWeatherForcastData = {
    LocalizedName: string,
    Key: string,
    Headline: {
        EffectiveDate: string,
        EffectiveEpochDate: number,
        Severity: number,
        Text: string,
        Category: string,
        EndDate: string | null,
        EndEpochDate: number | null,
        MobileLink: string,
        Link: string,
    },
    DailyForecasts: DailyForcasts[]
}

export type DailyForcasts = {
    Date: string;
    EpochDate: number,
    Temperature: Record<"Minimum" | "Maximum", Temperature>,
    Day: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: boolean,
    },
    Night: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: boolean,
    },
    Sources: string[],
    MobileLink: string,
    Link: string
}

export type Temperature = {
    Value: number,
    Unit: string,
    UnitType: number
}