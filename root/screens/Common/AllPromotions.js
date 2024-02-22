import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TitleBar from '../../components/TitleBar/TitleBar'
import Promotions from '../User/dashboard/Home/Component/Promotions'
import { dummmyPromoData } from '../User/dashboard/Account/other/DummyData'
import { FetchOffers } from '../../API/USER'
import SessionContext from '../../context/Session/session'
import ImageViewerModal from '../../components/ImageViewerModal'
import { PromotionSkeletonAnimation } from '../../animation/PromotionSkeletonAnimation'

const AllPromotions = ({ navigation }) => {

  const [offersData, setOffersData] = useState("");
  const session = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false)
  const [cardImage, setCardImage] = useState(null)
  const [cardImageWithUri, setCardImageWithUri] = useState(null)
  const [loading, setLoading] = useState(true)


  const FetchOffersFn = () => {
    FetchOffers(session.session.token).then((res) => {
      setOffersData(res);
      setLoading(false);
    }
    ).catch((e) => {
      console.log("Error in fetching Offers", e);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    }
    )
  }

  useEffect(() => {
    FetchOffersFn()
  }
    , [session.session.token]);

  const onPressImage = () => {
    setShowModal(true)
  }

  useEffect(() => {
    if (cardImage !== null) {
      setCardImageWithUri({ uri: cardImage })
    }
  }
    , [cardImage])

  console.log("loading in allPromos::>>", loading)


  return loading ? <PromotionSkeletonAnimation /> : (
    offersData.length > 0 ? (
      (
        <View style={styles.container}>
          <TitleBar title="Promotions" navigation={navigation} />
          <FlatList
            data={offersData}
            renderItem={({ item }) => <Promotions
              item={item}
              onPressImage={onPressImage}
              setCardImage={setCardImage}
            />}
            keyExtractor={(item) => item.id}
          />

          {showModal && <ImageViewerModal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            images={cardImageWithUri
            }
          />}

        </View>
      )
    ) : null
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  }
})

export default AllPromotions