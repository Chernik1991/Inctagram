// /**
//  * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
//  * for better readability and excluding export same selectors from different part of app
//  */

import { AppRootStateType } from '@/src/services'

export const menuSelector = (state: AppRootStateType) => state.menu.variantIcon
