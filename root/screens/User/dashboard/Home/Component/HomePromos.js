import { FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Promotions from './Promotions'
import SessionContext from '../../../../../context/Session/session'
import { FetchOffers } from '../../../../../API/USER'
import ImageViewerModal from '../../../../../components/ImageViewerModal'
import { PromotionSkeletonAnimation } from '../../../../../animation/PromotionSkeletonAnimation'

const HomePromos = ({ refresh }) => {

    const [offersData, setOffersData] = useState("");
    const session = useContext(SessionContext)
    const [showModal, setShowModal] = useState(false)
    const [cardImage, setCardImage] = useState(null)
    const [cardImageWithUri, setCardImageWithUri] = useState(null)
    const [loading, setLoading] = useState(true)

    function fetchPromosFunc() {
        if (session.session.token === null) {
            return;
        }
        FetchOffers(session.session.token).then((res) => {
            setOffersData(res);
            setLoading(false);
        }).catch((e) => {
            Toast.show({
                type: 'error', text1: 'Error', text2: 'Something went wrong'
            });
            setLoading(false);

        })
    }

    useEffect(() => {
        if (refresh === true ) {
            fetchPromosFunc()
            setLoading(true);
        }
    }
        , [session.session.token, refresh]);

    const onPressImage = () => {
        setShowModal(true)
    }

    useEffect(() => {
        if (cardImage !== null) {
            setCardImageWithUri({ uri: cardImage })
        }
    }
        , [cardImage])



    return loading ? <PromotionSkeletonAnimation fromHome /> : (
        offersData.length > 0 ? (
            (
                <>
                    <Promotions item={offersData?.[0]}
                        onPressImage={onPressImage}
                        setCardImage={setCardImage} />

                    {showModal && <ImageViewerModal
                        visible={showModal}
                        onRequestClose={() => setShowModal(false)}
                        images={cardImageWithUri}
                    />}

                </>
            )
        ) : null
    )

}

export default HomePromos