export interface ProxyData {
    hostname: string;
    port: string | number;
}

export interface FacebookMessagePayload {
    object: string;
    entry: FacebookMessagePayloadEntry[];
}

export interface FacebookMessagePayloadEntry {
    id: string;
    time: number;
    messaging: FacebookMessagePayloadMessagingEntry[];
}
export interface FacebookMessagePayloadMessagingEntry {
    sender: {
        id: string;
    };
    recipient: {
        id: string;
    };
    timestamp: number;
    message?: FacebookMessagePayloadMessageEntry;
    account_linking?: FacebookMessagePayloadAccountLinking;
    checkout_update?: FacebookMessagePayloadCheckoutUpdate;
    delivery?: FacebookMessagePayloadDelivery;
    game_play?: FacebookMessagePayloadGame;
    pass_thread_control?: FacebookMessageHandover;
    optin?: FacebookMessageOptin;
    payment?: FacebookMessagePayloadPayment;
    "policy-enforcement"?: FacebookMessagePayloadPolicyEnforcement;
    postback?: FacebookMessagePayloadPostback;
    payment_pre_checkout?: FacebookMessagePayloadPreCheckout;
    read?: FacebookMessagePayloadRead;
    referral?: FacebookMessagePayloadReferral;
    standby?: FacebookMessagePayloadStandbyChannel[];
}
export interface FacebookMessagePayloadMessageEntry {
    mid: string;
    is_echo?: boolean;
    app_id?: number;
    metadata?: string;
    seq?: string;
    text?: string;
    attachments?: (
        | FacebookMessagePayloadAttachments
        | FacebookMessagePayloadAttachmentsFallback
    )[];
    quick_reply?: {
        payload: string;
    };
}
export interface FacebookMessagePayloadAttachments {
    type: ATTACHMENT_TYPE;
    payload:
        | FacebookMessagePayloadAttachmentMultimedia
        | FacebookMessagePayloadAttachmentLocation;
}
export interface FacebookMessagePayloadAttachmentMultimedia {
    url: string;
}
export interface FacebookMessagePayloadAttachmentLocation {
    "coordinates.lat": string;
    "coordinates.long": string;
}
export interface FacebookMessagePayloadAttachmentsFallback {
    type: ATTACHMENT_TYPE;
    payload: null;
    url: string;
    title: string;
}
export interface FacebookMessagePayloadPostback {
    title: string;
    payload: string;
    referral: FacebookMessagePayloadReferral;
}
export interface FacebookMessagePayloadReferral {
    ref?: string;
    source: REFERER_SOURCE;
    type: string;
    ad_id?: string;
    referer_uri?: string;
}
export interface FacebookMessagePayloadRead {
    watermark: string;
    seq: string;
}
export interface FacebookMessagePayloadDelivery {
    mids: string[];
    watermark: number;
    seq: number;
}
export interface FacebookMessagePayloadStandbyChannel {
    sender: {
        id: string;
    };
    recipient: {
        id: string;
    };
    message?: FacebookMessagePayloadMessageEntry;
    postback?: FacebookMessagePayloadPostback;
    read?: FacebookMessagePayloadRead;
    delivery?: FacebookMessagePayloadDelivery;
}
export interface FacebookMessagePayloadPreCheckout {
    payload: string;
    amount: {
        currency: string;
        amount: string;
    };
    requested_user_info: {
        shipping_address: FacebookMessagePayloadPaymentShipping;
        contact_name: string;
    };
}
export interface FacebookMessagePayloadPaymentShipping {
    name?: string;
    id?: string;
    street_1: string;
    street_2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
}
export interface FacebookMessagePayloadAccountLinking {
    status: string;
    authorization_code: string;
}
export interface FacebookMessagePayloadCheckoutUpdate {
    payload: string;
    shipping_address: FacebookMessagePayloadPaymentShipping;
}
export interface FacebookMessagePayloadGame {
    game_id: string;
    player_id: string;
    context_type: string;
    context_id: string;
    score: number;
    payload: string;
}
export interface FacebookMessageHandover {
    new_owner_app_id: string;
    metadata: string;
}
export interface FacebookMessageOptin {
    ref: string;
    user_ref: string;
}
export interface FacebookMessagePayloadPolicyEnforcement {
    action: string;
    reason: string;
}
export interface FacebookMessagePayloadPayment {
    requested_user_info: {
        shipping_address: FacebookMessagePayloadPaymentShipping;
        contact_name: string;
        contact_email: string;
        contact_phone: string;
    };
    payment_credential: {
        provider_type: string;
        charge_id: string;
        fb_payment_id: string;
        tokenized_card?: string;
        tokenized_cvv?: string;
        token_expiry_month?: string;
        token_expiry_year?: string;
    };
    amount: {
        currency: string;
        amount: string;
    };
    shipping_option_id: string;
}

export interface QuickReply {
    content_type: QUICK_REPLY_TYPE;
    title?: string;
    payload?: string | number;
    image_url?: string;
}

export interface MessageTemplate {
    template_type: MESSAGE_TEMPLATE_TYPE;
}

export interface Button {
    type: BUTTON_TYPE;
}

export interface ButtonTemplate extends MessageTemplate {
    text?: string;
    buttons: Button[];
    sharable?: boolean;
}

export interface GenericTemplateElement {
    title: string;
    subtitle?: string;
    image_url?: string;
    default_action?: {
        type: string;
        url: string;
        messenger_extensions?: boolean;
        fallback_url?: string;
        webview_height_ratio?: string;
        webview_share_button?: string;
    };
    buttons: Button[];
}

export interface GenericTemplate extends MessageTemplate {
    image_aspect_ratio?: string;
    elements: GenericTemplateElement[];
}

export interface ListTemplate extends MessageTemplate {
    top_element_style?: LIST_TOP_ELEMENT_STYLE;
    buttons?: Button[];
    elements: GenericTemplateElement[];
    sharable?: boolean;
}

export interface MediaTemplateElement {
    media_type: MEDIA_TYPE;
    attachment_id?: string;
    url?: string;
    buttons: Button[];
}

export interface MediaTemplate extends MessageTemplate {
    elements: MediaTemplateElement[];
    sharable?: boolean;
}

export interface OpenGraphElement {
    url: string;
    buttons: Button[];
}

export interface OpenGraphTemplate extends MessageTemplate {
    elements: OpenGraphElement[];
}

export interface ReceiptAddressProperty {
    street_1: string;
    street_2?: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
}

export interface ReceiptSummaryProperty {
    subtotal?: number;
    shipping_cost?: number;
    total_tax?: number;
    total_cost: number;
}

export interface ReceiptAdjustmentProperty {
    name: string;
    amount: number;
}

export interface ReceiptElements {
    title: string;
    subtitle?: string;
    quantity?: number;
    price: number;
    currency?: string;
    image_url?: string;
}

export interface ReceiptTemplate extends MessageTemplate {
    sharable?: boolean;
    recipient_name: string;
    merchant_name?: string;
    order_number: string;
    currency: string;
    payment_method: string;
    timestamp?: string;
    adjustments?: ReceiptAdjustmentProperty;
    summary: ReceiptSummaryProperty;
    address?: ReceiptAddressProperty;
    elements?: ReceiptElements;
}

export interface BoardingPassAuxiliaryField {
    label: string;
    value: string;
}

export interface BoardingPassSecondaryField {
    label: string;
    value: string;
}

export interface FlightInfoFlightSchedule {
    boarding_time?: string;
    departuire_time: string;
    arrival_time?: string;
}

export interface FlightInfoDepartureAirport {
    airport_code: string;
    city: string;
    terminal?: string;
    gate?: string;
}

export interface FlightInfoArrivalAirport {
    airport_code: string;
    city: string;
    terminal?: string;
    gate?: string;
}
export interface BoardingPassFlightInfo {
    flight_number: string;
    departure_airport: FlightInfoDepartureAirport;
    arrival_airport: FlightInfoArrivalAirport;
    flight_schedule: FlightInfoFlightSchedule;
}
export interface BoardingPass {
    passenger_name: string;
    pnr_number: string;
    travel_class?: string;
    seat?: string;
    auxiliary_fields?: BoardingPassAuxiliaryField;
    secondary_fields?: BoardingPassSecondaryField;
    logo_image_url: string;
    header_image_url?: string;
    header_text_field?: string;
    qr_code?: string;
    barcode_image_url?: string;
    above_bar_code_image_url: string;
    flight_info: BoardingPassFlightInfo;
}
export interface AirlineBoardingPassTemplate extends MessageTemplate {
    intro_message: string;
    locale: string;
    theme_color?: string;
    boarding_pass: BoardingPass[];
}
export interface AirlineCheckInTemplate extends MessageTemplate {
    intro_message: string;
    locale: string;
    pnr_number?: string;
    checkin_url: string;
    flight_info: BoardingPassFlightInfo[];
}
export interface AirlineItineraryPassengerInfo {
    passenger_id: string;
    ticket_number?: string;
    name: string;
}
export interface AirlineItineraryFlightInfo {
    connection_id: string;
    segment_id: string;
    flight_number: string;
    aircraft_type?: string;
    departure_airport: FlightInfoDepartureAirport;
    arrival_airport: FlightInfoArrivalAirport;
    flight_schedule: FlightInfoFlightSchedule;
    travel_class: AIRLINE_TRAVEL_CLASS;
}
export interface AirlinePassengerProductInfo {
    title: string;
    value: string;
}
export interface AirlineItineraryPassengerSegment {
    segment_id: string;
    passenger_id: string;
    seat: string;
    seat_type: string;
    product_info?: AirlinePassengerProductInfo[];
}
export interface AirlineItineraryPriceInfo {
    title: string;
    amount: number;
    currency?: string;
}
export interface AirlineItineraryTemplate extends MessageTemplate {
    intro_message: string;
    locale: string;
    theme_color?: string;
    pnr_number: string;
    passenger_info: AirlineItineraryPassengerInfo[];
    flight_info: AirlineItineraryFlightInfo[];
    passenger_segment_info: AirlineItineraryPassengerSegment[];
    price_info?: AirlineItineraryPriceInfo[];
    base_price?: number;
    tax?: number;
    total_price: number;
    currency: string;
}
export interface AirlineFlightUpdateTemplate extends MessageTemplate {
    intro_message: string;
    theme_color?: string;
    update_type: string;
    locale: string;
    pnr_number?: string;
    update_flight_info: BoardingPassFlightInfo;
}

export enum QUICK_REPLY_TYPE {
    TEXT = "text",
    LOCATION = "location",
    USER_PHONE_NUMBER = "user_phone_number",
    USER_EMAIL = "user_email",
}

export enum LIST_TOP_ELEMENT_STYLE {
    LARGE = "large",
    COMPACT = "compact",
}

export enum BUTTON_PAYMENT_TYPE {
    FIXED_AMOUNT,
    FLEXIBLE_AMOUNT,
}

export enum ATTACHMENT_TYPE {
    IMAGE = "image",
    AUDIO = "audio",
    VIDEO = "video",
    FILE = "file",
    TEMPLATE = "template",
    FALLBACK = "fallback",
}
export enum MESSAGE_TEMPLATE_TYPE {
    BUTTON = "button",
    LIST = "list",
    GENERIC = "generic",
    MEDIA = "media",
    OPEN_GRAPH = "open_graph",
    RECEIPT = "receipt",
    AIRLINE_BOARDING_PASS = "airline_boardingpass",
    AIRLINE_CHECKIN = "airline_checkin",
    AIRLINE_ITINERARY = "airline_itinerary",
    AIRLINE_UPDATE = "airline_update",
}

export enum BUTTON_TYPE {
    BUY = "payment",
    CALL = "phone_number",
    GAME_PLAY = "game_play",
    LOG_IN = "account_link",
    LOG_OUT = "account_unlink",
    POSTBACK = "postback",
    SHARE = "element_share",
    URL = "web_url",
}

export enum MEDIA_TYPE {
    IMAGE = "image",
    VIDEO = "video",
}

export enum AIRLINE_TRAVEL_CLASS {
    ECONOMY = "economy",
    BUSINESS = "business",
    FIRST_CLASS = "first_class",
}

export enum REFERER_SOURCE {
    MESSENGER_CODE = "MESSENGER_CODE",
    DISCOVER_TAB = "DISCOVER_TAB",
    ADS = "ADS",
    SHORTLINK = "SHORTLINK",
    CUSTOMER_CHAT_PLUGIN = "CUSTOMER_CHAT_PLUGIN",
}

export interface PageSettings {
    setting_type: string;
}

export interface GreetingSettings extends PageSettings {
    greeting: {
        text?: string;
    };
}

export interface GetStartedSettings extends PageSettings {
    thread_state: string;
    call_to_actions: [
        {
            payload?: string;
        }
    ];
}

export interface PersistentMenuSettings extends PageSettings {
    thread_state: string;
    persistent_menu: [
        {
            locale: string;
            call_to_actions?: any[];
        }
    ];
}

export interface PagePost {}
export interface PagePostImage extends PagePost {
    caption: string;
    url: string;
}

export interface PagePostText extends PagePost {
    message: string;
    link: string;
}

export interface RequestOptions {
    url: string;
    qs: {
        access_token?: string;
        fields?: string;
    };
    method?: string;
    proxy?: Object;
    json?: PageSettings | PagePost | ClientMessage;
}

export interface RequestData {
    token: string;
    proxy?: string;
}

export interface PagePost {}
export interface PagePostImage extends PagePost {
    caption: string;
    url: string;
}

export interface PagePostText extends PagePost {
    message: string;
    link: string;
}

export interface ClientMessage {
    message?: MessagePayload;
    sender_action?: string;
}

export interface AttachmentPayload {
    type: ATTACHMENT_TYPE;
    payload: Object;
}

export interface MessagePayload {
    text?: string;
    quick_replies?: QuickReply[];
    attachment?: AttachmentPayload;
}

export interface ClientMessage {
    message?: MessagePayload;
    sender_action?: string;
}

export interface AttachmentPayload {
    type: ATTACHMENT_TYPE;
    payload: Object;
}

export interface MessagePayload {
    text?: string;
    quick_replies?: QuickReply[];
    attachment?: AttachmentPayload;
}

export interface PageSettings {
    setting_type: string;
}

export interface GreetingSettings extends PageSettings {
    greeting: {
        text?: string;
    };
}

export interface GetStartedSettings extends PageSettings {
    thread_state: string;
    call_to_actions: [
        {
            payload?: string;
        }
    ];
}

export interface PersistentMenuSettings extends PageSettings {
    thread_state: string;
    persistent_menu: [
        {
            locale: string;
            call_to_actions?: any[];
        }
    ];
}
