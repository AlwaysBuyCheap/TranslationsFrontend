import React from 'react'
import { TranslationResult } from '../library/api/querys'
import DeleteIcon from '../public/delete.svg'
import SaveIcon from '../public/save.svg'

interface IWordActionsProps {
    word: TranslationResult | null
}

const WordActions = (props: IWordActionsProps): React.ReactElement => {

    const Result = () => {
        if (props.word) {
            return (
                <div style={styles.body}>
                    <AddOrDeleteIcon />
                </div>
            )
        }
    }

    const AddOrDeleteIcon = () => {
        if (props.word.existsInDB) {
            return <DeleteIcon />
        }

        return <SaveIcon />
    }

    return Result()
}

export default WordActions

const styles: {
    [index: string]: React.CSSProperties
} = {
    body: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '15px'
    }
}