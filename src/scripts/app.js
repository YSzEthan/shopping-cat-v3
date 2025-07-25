import "@fortawesome/fontawesome-free/css/all.css"
import Alpine from 'alpinejs'
import{commodity,cartShop,header} from './messeger'
import{storedata} from './StoreData'

window.Alpine = Alpine
Alpine.data("commodity",commodity)
Alpine.data("cartShop",cartShop)
Alpine.data("header",header)
Alpine.store("data",storedata)


Alpine.start()

