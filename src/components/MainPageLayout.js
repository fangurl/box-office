import React from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPageLayout = ({ children }) => {
    return (
        <div>
            <Title
            title="Box Office!"
            subtitle="You looking for a movie? Or an actor?
            You're in the right place!"
            />
            <Navs/>

            {children}
        </div>
    )
}

export default MainPageLayout
