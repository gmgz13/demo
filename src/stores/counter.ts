import {defineStore} from "pinia";

export const useCounterStore = defineStore({
    id: "counter",
    state: () => ({
        car: {
            id: 1,
            name: '',
            color: '',
            performance: [
                {
                    name: '跑车级性能表现',
                    detail: [
                        {
                            name: '最高时速（公里/小时）',
                            data: '250'
                        },
                        {
                            name: '0-100公里/小时加速时间',
                            data: '5.7'
                        }
                    ]
                },
                {
                    name: '燃油经济性',
                    detail: [
                        {
                            name: '综合油耗— —升/百公里',
                            data: '9.1'
                        },
                        {
                            name: '综合二氧化碳排放量— —克/公里',
                            data: '215'
                        }
                    ]
                },
                {
                    name: '动力总成系统',
                    detail: [
                        {
                            name: '排量（毫升）',
                            data: '1997'
                        },
                        {
                            name: '最大功率(马力/转每分)',
                            data: '300'
                        },
                        {
                            name: '最大扭矩(牛米/转每分)',
                                data: '400'
                        },
                        {
                            name: '变速箱',
                            data: '自动变速箱'
                        },
                    ]
                },
                {
                    name: '重量',
                    detail: [
                        {
                            name: '整备质量（千克）',
                            data: '1655'
                        },
                        {
                            name: '车辆总重（千克）',
                            data: '1925'
                        }
                    ]
                },
                {
                    name: '尺寸',
                    detail: [
                        {
                            name: '车高（毫米）',
                            data: '1311'
                        },
                        {
                            name: '长度（毫米）',
                            data: '4470'
                        },
                        {
                            name: '后视镜折叠后的车宽（毫米）',
                            data: '1923'
                        },
                        {
                                name: '后视镜展开后的车宽（毫米）',
                            data: '2042'
                        },
                        {
                            name: '轴矩（毫米）',
                            data: '2622'
                        }
                    ]
                }
            ]
        }
    }),
    getters: {},
    actions: {},
});