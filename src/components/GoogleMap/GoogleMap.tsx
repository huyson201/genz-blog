

import React from 'react'

type Props = {}

const GoogleMap = (props: Props) => {
    return (
        <div className="relative text-right w-full mt-12 lg:px-24">
            <div className="gmap_canvas rounded-xl ">
                <iframe className="gmap_iframe" width="100%"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Ho Chi Minh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                <a href="https://gachanymph.com/">Gacha Nymph</a></div>

        </div>
    )
}

export default GoogleMap