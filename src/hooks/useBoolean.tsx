import React, { useState } from 'react'

function useBoolean(initial: boolean): [boolean, (val?: boolean) => void] {
    const [condition, setCondition] = useState<boolean>(initial)
    const onChange = (val: boolean = !condition) => setCondition(condition)

    return [condition, onChange]
}

export default useBoolean