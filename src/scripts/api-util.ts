import apiCall from "./api-call"
import { ascendArray } from "./utils"

interface Option {
    label: string,
    value: any
}

interface Code {
    codeName: string,
    codeId: any
}

export const setCodeGroupOptions = async (codeGroupId: string, options: Option[], defaultOption?: Option) => {
    options.length = 0
    const url = `/api/code-group?codeGroupId=${codeGroupId}`
    const { body: pagedList } = await apiCall.get(url, null, null)
    if (pagedList) {
        pagedList.list.forEach((item: Code) => {
            options.push({ label: item.codeName, value: item.codeId })
        })
        ascendArray(options, 'codeId')
        if (defaultOption) {
            options.unshift(defaultOption)
        }
    }
}