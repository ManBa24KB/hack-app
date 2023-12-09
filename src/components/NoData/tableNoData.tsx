import styled from 'styled-components'
import NodaImg from '@/assets/images/tableNodata.png'

const TableNoDataContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    img {
        height: 120rem;
    }
`

const TableNoData = () => {
    return (
        <TableNoDataContent>
            <img alt='no data' src={NodaImg} />
        </TableNoDataContent>
    )
}

export default TableNoData