! function e(n, i, a) {
    function t(r, s) {
        if (!i[r]) {
            if (!n[r]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(r, !0);
                if (o) return o(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = i[r] = {
                exports: {}
            };
            n[r][0].call(u.exports, function(e) {
                var i = n[r][1][e];
                return t(i ? i : e)
            }, u, u.exports, e, n, i, a)
        }
        return i[r].exports
    }
    for (var o = "function" == typeof require && require, r = 0; r < a.length; r++) t(a[r]);
    return t
}({
    1: [function(e, n, i) {
        var a;
        "undefined" != typeof window && (n.exports = window.locales = {}), a = {
            en: {
                country_code: "en",
                locale_name: "English",
                locales: "en-US",
                messages: e("./en.json")
            }
        }, n.exports.locales = a, n.exports.getLocalization = function(e) {
            return a[e] || a.en
        }, "undefined" != typeof jpexports && (jpexports.locales = a, jpexports.getLocalization = n.exports.getLocalization)
    }, {
        "./en.json": 3,
    }],
    
    3: [function(e, n, i) {
        n.exports = {
            brand: {
                premium: "Premium",
                zenmate: "ChromeVPN",
                zenmate_premium: "ChromeVPN siêu"
            },
            description: "Truy cập bất kỳ trang web nào, ẩn địa chỉ IP của em. Bảo mật thông tin cá nhân của em khỏi những kẻ mất dạy.",
            errors: {
                api_down: "Xin lỗi em, ChromeVPN tạm thời khó hoạt động lúc này, xin em hãy thử lại sau.",
                connection: "Lỗi truy cập",
                offline: "Hình như em chưa có internet, hãy thử kiểm tra wifi hoặc dây mạng xem sao.",
                param_proxy_clone: {
                    email: {
                        must_be_present: "Email sai"
                    }
                },
                sign_in: "Lỗi đăng nhập",
                sign_up: "Lỗi đăng ký",
                unknown: "Xin lỗi em, ChromeVPN tạm thời khó hoạt động lúc này, xin em hãy thử lại sau..",
                user: {
                    email: {
                        must_be_valid: "Email sai định dạng",
                        not_found: "Không thể tìm email của em",
                        taken: "Email đã được đăng ký, em có thể đăng nhập liền."
                    },
                    password: {
                        must_be_present: "Phải điền mật khẩu",
                        too_long: "Mật khẩu quá dài",
                        too_short: "Mật khẩu quá ngắn"
                    },
                    unknown_email_password: "Email hoặc mật khẩu không đúng."
                }
            },
            icon_hover: {
                connected: "Em đã truy cập trang {host} với IP của {country}.",
                disabled: "ChromeVPN hiện đang bị tắt.",
                disabled_smart: "Em đã tắt ChromeVPN cho trang này.",
                local: "Em đang xem trang ở chế độ offline.",
                signed_out: "Em chưa đăng nhập."
            },
            locations: {
                ca: "Canada",
                ch: "Switzerland - Thụy Sĩ",
                de: "Germany - Đức",
                fr: "France - Pháp",
                gb: "United Kingdom - Vương quốc Anh",
                hk: "Hong Kong",
                ro: "Romania - Một nước ở Đông-Nam châu Âu, giáp biển Đen",
                sg: "Singapore",
                us: "United States - Mỹ",
                uw: "United States West - Miền tây nước Mỹ"
            },
            name: "ZenMate Security, Privacy & Unblock VPN",
            notifications: {
                status_change: {
                    downgraded_msg: "Click here to renew your account and re-enable your Premium features.",
                    downgraded_title: "Your Premium account has expired",
                    upgraded_msg: "You can now enjoy turbo speeds and all your Premium benefits.",
                    upgraded_title: "Welcome to ZenMate Premium!"
                }
            },
            page: {
                exit: {
                    android_link: "Android",
                    cta_button: "Get 7 days of Premium free",
                    cta_button_sub: "No credit card required! After 7 days have expired you will automatically be switched back to the free plan.",
                    family_copy_first: "Offering the same great benefits as our popular browser extensions, make sure to also get ZenMate for your mobile devices to be protected on the go. Available for both {ios} and {android}, our mobile applications also provide unlimited bandwidth for FREE!",
                    family_copy_second: "Want to secure your entire desktop device? Exclusive to ZenMate Premium users, our full desktop VPN clients for Windows and MacOSX provide complete security and privacy by tunneling to all your device’s connections and downloads.",
                    family_headline: "Get ZenMate on all your devices",
                    got_it_button: "Got it",
                    headline: "You are now protected!",
                    ios_link: "iOS",
                    slogan: "Want to try ZenMate Premium?",
                    slogan_sub: "Create an account now to get 7 days Premium for free.",
                    verified: {
                        cta_button: "Get ZenMate Premium",
                        slogan: "Want faster speed and our desktop clients?"
                    }
                },
                features: {
                    exit: {
                        clients: "Full desktop VPN",
                        locations: "Additional Premium locations",
                        speed: "Turbo speed"
                    },
                    free: {
                        clients: "Bảo vệ dữ liệu tuyệt đối",
                        locations: "Nhiều địa chỉ IP tha hồ lựa chọn",
                        speed: "Tốc độ siêu nhanh"
                    },
                    premium: {
                        clients: "Bảo kê dữ liệu tuyệt đối bởi sự tấn công của tin tặc, sự theo dõi của các phần mềm trên máy tính của em.",
                        locations: "Rất nhiều địa chỉ IP trên thế giới mà em có thể tha hồ lựa chọn và thay đổi trong tức thì.",
                        speed: "Tốc độ Proxy nhanh đến nỗi tên lửa cũng khó mà so được."
                    }
                },
                modal: {
                    forgot: {
                        back: "Back to log in",
                        heading: "It's human to forget!",
                        placeholder: "Email",
                        reset_button: "Reset"
                    },
                    login: {
                        forgot_password: "Forgot your password?",
                        forgot_sent: "A password reset link has been sent. Please check your email.",
                        heading: "Welcome back!",
                        login_button: "Log In",
                        placeholder_email: "Email",
                        placeholder_password: "Password"
                    },
                    signup: {
                        heading: "Sign up for ZenMate and get 7 days of Premium free!",
                        login_button: "Send verification link",
                        placeholder_email: "Email",
                        placeholder_password: "Password",
                        signin_existing_account: "Login with existing account",
                        subtext_copy: "Your email is used to recover your account if you forgot your password. ZenMate will occasionally inform you via email about important service updates. You can unsubscribe at any time.",
                        subtext_head: "We will never sell your email or send you spam."
                    }
                },
                premium: {
                    got_it_button: "Ok. Em đã hiểu.",
                    subheader: "ChromeVPN là phần mềm của thầy để đáp lại tính năng 'Thoải mái truy cập Facebook' của Cốc Cốc. Ở đây thông điệp của thầy với ChromeVPN là 'Thoải mái truy cập bất kỳ trang web nào với mức bảo mật thông tin đỉnh cao thế giới'.",
                    thankyou: "Chúc mừng em đã kích hoạt ChromeVPN. Hiện ChromeVPN đang chạy, em có thể tắt bất kỳ lúc nào ở trang cài đặt nếu chưa muốn sử dụng hoặc cảm thấy tốc độ mạng chậm lại.",
                    thankyou_sub: ""
                },
                verify: {
                    premium: {
                        subheader: "Click the link in the email to gain access to all of our Premium features including both our desktop clients."
                    },
                    thankyou: "Thank you for using ZenMate!",
                    thankyou_sub: "We have sent you a confirmation email to {email}."
                },
                welcome: {
                    cta_privacy_policy: "Click nút phía trên để kích hoạt tính năng đổi IP siêu đỉnh của ChromeVPN",
                    cta_start_using: "Kích hoạt {zenmate}",
                    cta_subtext: "Đổi IP, bảo mật các đường truyền khi truy cập mạng",
                    existing_account: "Already have an account? ",
                    log_in_here: "Log in here",
                    privacy_policy: "Privacy Policy",
                    slogan_first: "ChromeVPN là phần mềm thay đổi địa chỉ IP với độ bảo mật vô biên và tốc độ tối đa.",
                    slogan_second: "Lần đầu khi mở Chrome em phải kích hoạt ChromeVPN để cho phép VPN chỉnh sửa địa chỉ IP của của Chrome. Sau đó, ChromeVPN sẽ tự động chạy với server mặc định. Em có thể thay đổi cài đặt server hoặc bật/tắt ChromeVPN ở Icon của thầy. Hồng Kông, Đức, Mỹ là các quốc gia có IP tốt nhất với tốc độ tối đa của mạng Việt Nam.",
                    terms_of_service: "Terms of Service"
                }
            },
            popup: {
                features: {
                    always_on: {
                        description: "Không giống như các phần mềm thay đổi proxy khác, Chrome VPN của thầy liên kết trực tiếp với máy chủ siêu ẩn danh và kết nối này sẽ không bao giờ bị ngắt quảng dù chỉ trong 1 phần tỉ giây. Điều đó có nghĩa là em sẽ luôn luôn được bảo mật khi Chrome VPN được kích hoạt. Chrome VPN chỉ ẩn địa chỉ IP của em khi em truy cập bằng trình duyệt Chrome mà thôi, Chrome VPN chỉ hoạt động cục bộ trong Chrome, nếu muốn thay đổi địa chỉ IP của em trên toàn máy tính thì em phải sử dụng một phần mềm thay đổi proxy được cài đặt trên máy tính của mình.",
                        first: "Luôn",
                        second: " trực tuyến"
                    },
                    builtin_title: "Các tính năng tự động khi bật ChromeVPN",
                    encrypted: {
                        description: "Chrome VPN sử dụng công nghệ cấp mã bảo mật TLS đỉnh cao để bảo vệ các kết nối của em trên mạng từ bất kỳ kẻ nào muốn theo dõi các hoạt động trực tuyến của em.",
                        first: "Siêu bảo mật"
                    },
                    malware_blocking: "Khóa phần mềm độc hại",
                    malware_blocking_description: "Tự động chặn tức thì các trang có chứa phần mềm độc hại hoặc chứa các đoạn mã độc trước khi chúng lan đến trình duyệt của em",
                    nat_firewall: {
                        description: "Công nghệ tường lửa NAT Firewall cập nhật từng giờ của máy chủ Chrome VPN giúp ngăn chặn tin tặc quét các thông tin từ hệ thống của em do các lỗ hổng bảo mật từ hệ điều hành.",
                        first: "NAT",
                        second: "Firewall"
                    },
                    on_demand: "Truy cập thông minh",
                    on_demand_description: "Cài Chrome VPN để tự động điều chỉnh IP cho từng trang web mà em truy cập. Ví dụ: vào Facebook sẽ tự động dùng server tại Mỹ, vào Gmail sẽ sử dụng server tại Canada,..",
                    premium_title: "Các tính năng nâng cao",
                    tracking_protection: "Chống theo dõi",
                    tracking_protection_description: "Bảo vệ em khỏi các dịch vụ của bên thứ 3 (như các phần mềm cài từ máy tính, các trang web trên mạng,.. ) theo dõi và thu thập các thông tin từ các hoạt động trực tuyến của em."
                },
                header: {
                    trial: {
                        copy: "Choose a plan that best suits your needs to continue enjoying all of your Premium benefits. Gain exclusive access to new exciting features.",
                        monthly: {
                            cta: "Get Monthly",
                            name: "1 Month",
                            price: "€8.99/mo."
                        },
                        six_monthly: {
                            cta: "Get 6 Monthly",
                            name: "6 Months",
                            price: "€7.99/mo."
                        },
                        trial_ended: "Your 7-day trial has ended",
                        yearly: {
                            cta: "Get Yearly",
                            name: "Yearly",
                            price: "€6.49/mo.",
                            save: "Save 28%"
                        }
                    }
                },
                home: {
                    blocked: {
                        copy: "ChromeVPN không thể hoạt động khi có một Extension khác kiểm soát Proxy của Chrome.",
                        extension: "Em đang sử dụng một extension khác đang chiếm dụng Proxy của Chrome, điều đó ngăn ChromeVPN sử dụng Proxy của mình. Em hãy tắt các ứng dụng đó ở {extension_settings}:",
                        extension_settings: "cài đặt phần mềm",
                        heading: "ChromeVPN đã tắt",
                        unblock: "Cho phép ChromeVPN sử dụng cài đặt Proxy",
                        unknown: "ChromeVPN không thể hoạt động vì một phần mềm khác hoặc một cài đặt proxy khác đang chiếm đóng dữ liệu và ngăn cản ChromeVPN hoạt động đúng khả năng của nó."
                    },
                    custom: {
                        connection: "Cài 'Truy câp thông minh' cho {domain}, lúc này em sẽ truy cập ở {location}.",
                        copy: "'Truy cập thông minh' sẽ tự động kích hoạt với IP cài sẵn khi em truy cập vào website đã định trước.",
                        directinfo: "ChromeVPN tự tắt ở trang web này.",
                        heading: "'Truy cập thông minh' đã được kích hoạt."
                    },
                    custom_disabled: {
                        connection: "Cài 'Truy câp thông minh' cho {domain}, lúc này em sẽ truy cập ở {location}.",
                        copy: "ChromeVPN đã tắt, nhưng 'Truy cập thông minh' thì được kích hoạt cho trang này.",
                        directinfo: "ChromeVPN tự tắt ở trang web này.",
                        heading: "'Truy cập thông minh' đã được kích hoạt."
                    },
                    disabled: {
                        copy: "ChromeVPN hiện đang tắt. Nhưng 'Truy cập thông minh' vẫn được kích hoạt với một số website mà em đã định.",
                        copy2: "Khi tắt ChromeVPN, dữ liệu khi truy cập internet của em sẽ không được bảo vệ và em sẽ hiện diện với IP thực của mạng nhà em.",
                        heading: "ChromeVPN đang tắt.",
                        smart_locations: "'Truy cập thông minh'",
                        smart_locations_disabled: "Mẹo: Em có thể sử dụng 'Truy cập thông minh' để kích hoạt ChromeVPN trong một vài trang web xác định mà em ưa thích cho dù ChromeVPN đã tắt.",
                        smart_locations_enabled: "'Truy cập thông minh' đã được bật và vẫn sẽ kích hoạt dù ChromeVPN đã tắt."
                    },
                    enabled: {
                        connection: "Em đang xem trang '{domain}' và em đang ở {location}.",
                        copy: "Những truy xuất trên mạng của em đều được mã hóa, vị trí hiện tại của em được giấu kín, và các thông tin riêng tư được giữ kín như bưng.",
                        heading: "ChromeVPN được kích hoạt.",
                        overlay: {
                            click_to_change: "Nhấp để thay đổi",
                            current_page: "Trang hiện tại",
                            edit_ondemand: "Nhấp để thêm 'Truy cập thông minh'",
                            public_location: "Vị trí hiện tại của em",
                            real_location: "Vị trí thực của em"
                        }
                    },
                    footer: {
                        change_location: "Đổi vị trí",
                        features: "Tính năng mở rộng",
                        settings: "Cài đặt"
                    },
                    local: {
                        connection: "Em đang xem một trang offline. Nhưng ChromeVPN sẽ bảo mật các đường truyền có truy cập internet.",
                        copy: "Những truy xuất trên mạng của em đều được mã hóa, vị trí hiện tại của em được giấu kín, và các thông tin riêng tư được giữ kín như bưng.",
                        heading: "ChromeVPN đang kích hoạt."
                    },
                    news: {
                        free: {
                            desktop_clients: {
                                copy: "Secure your entire device and downloads with our {desktop_clients}",
                                desktop_clients: "Premium Desktop Clients (Win/Mac)"
                            },
                            earlybird: {
                                copy: "Don't forget to claim your limited time, early adopter {premium_discount} now!",
                                premium_discount: "Premium discount"
                            },
                            faster_speed: "Get faster browsing and download speeds with {zenmate_premium}.",
                            get_premium: "Faster browsing, full protection, more locations. Discover all the benefits of {zenmate_premium}.",
                            malware_blocking: {
                                copy: "Block malicious sites and attacks with our Premium {malware_blocking}.",
                                malware_blocking: "malware blocking functionality"
                            },
                            more_locations: "Access more content with even more locations to choose from with {zenmate_premium}",
                            sign_up: {
                                copy: "Access more content with even more locations to choose. {get_time_free}",
                                get_time_free: "Test ZenMate Premium now for free!"
                            },
                            smart_locations: "Automatically connect to specific locations on your favorite websites with {zenmate_premium}.",
                            tracking_protection: "Block sites from tracking your browsing behavior across the Internet with {zenmate_premium}."
                        },
                        premium: {
                            all_benefits: {
                                account_page: "Account Page",
                                copy: "Get our Full Desktop VPN Clients and discover all your Premium benefits from your {account_page}."
                            },
                            desktop_clients: {
                                copy: "Secure your entire device and downloads with our {desktop_clients}",
                                desktop_clients: "Premium Desktop Clients (Win/Mac)"
                            },
                            malware_blocking: {
                                copy: "Block malicious sites and attacks with our Premium {malware_blocking}.",
                                malware_blocking: "malware blocking functionality"
                            },
                            renew_subscription: {
                                copy: "You have {num} days of ZenMate Premium remaining. {renew_subscription}",
                                renew_subscription: "Renew your subscription now!"
                            },
                            smart_locations: {
                                copy: "Automatically connect to specific locations on your favorite websites with {smart_locations}.",
                                smart_locations: "Smart Locations"
                            },
                            support: {
                                copy: "Do you need help with ZenMate? Get in touch with our {support_team}.",
                                support_team: "Premium support team"
                            },
                            tracking_protection: {
                                copy: "Block sites from tracking your browsing behavior across the Internet with {tracking_protection}.",
                                tracking_protection: "Tracking Protection"
                            }
                        }
                    }
                },
                languages: {
                    copy: "Select a language for ZenMate to be displayed in. Additional languages coming soon.",
                    heading: "Change language"
                },
                locations: {
                    copy: "Truy cập bất kỳ trang web nào, ẩn địa chỉ IP của em, và em sẽ xuất hiện ở một quốc gia khác với sự bảo mật siêu nhiên.",
                    heading: "Đổi vị trí hiện tại",
                    location_item: {
                        choose: "Đổi liền",
                        current: "Hiện tại",
                        premium: "PREMIUM"
                    },
                    no_locations: "Oops. Không thể lấy dữ liệu các khu vực cung cấp IP. Đây chỉ là lỗi tạm thời, em hãy thử lại sau nhe. Nếu vấn đề này vẫn còn thì có thể em chưa có quyền truy cập internet.",
                    smart_locations_enabled: "Hiện tại 'Truy cập thông minh' được kích hoạt để thay vị trí IP hiện tại của em."
                },
                premium: {
                    clients: {
                        copy: "Secure your whole device with our Desktop VPN apps which encrypt all online traffic and downloads.",
                        heading: "Desktop Clients (Win/Mac)"
                    },
                    cta: "Get Premium Now!",
                    earlybird: {
                        clients: "Desktop Clients",
                        copy: "For supporting us this far, we'd like to give you a {special_discount}.",
                        cta: "Get My Discount Now",
                        header: "Thank you!",
                        locations: "More locations",
                        special_discount: "Special Discount",
                        speed: "Turbo Speed"
                    },
                    locations: {
                        copy: "Get our most requested Premium locations, for more online content and closer server locations.",
                        heading: "Additional Locations"
                    },
                    speed: {
                        copy: "Guaranteed lightning fast speed via connection to our exclusive Premium server network.",
                        heading: "Turbo Speed"
                    }
                },
                rules: {
                    button: {
                        add: "Thêm vào 'Truy cập thông minh'",
                        add_host: "Thêm 'Truy cập thông minh' cho {site}",
                        remove_host: "Xóa 'Truy cập thông minh' của {site}"
                    },
                    hints: {
                        disabled: {
                            copy: "Đừng quên bật 'Truy cập thông minh' bằng nút bên dưới.",
                            heading: "'Truy cập thông minh' đã tắt"
                        },
                        empty: {
                            heading: "Sử dụng từng địa chỉ IP cho mỗi website mà em truy cập bằng:",
                            list_1: "Nhập địa chỉ website và chọn 'Vị trí truy cập'",
                            list_2: "Nhấp dấu '+' để tạo 'Truy cập thông minh'",
                            list_3: "Kể từ nay, tất cả những truy cập vào trang web đó, đều được đổi IP sang nước này."
                        },
                        first: {
                            copy: "Em có thể thêm vô số 'Truy cập thông minh' bằng cách sử dụng mẫu đơn phía trên.",
                            heading: "Em thật bá đạo, em đã tạo 'Truy cập thông minh' đầu tiên của mình."
                        },
                        selected: {
                            copy: "Chọn một địa chỉ khác cho trang '{current_domain}' và 'Truy cập thông minh' sẽ tự động cập nhật dữ liệu.",
                            heading: "Sửa 'Truy cập thông minh' này."
                        }
                    },
                    name: "Truy cập thông minh",
                    nlp: {
                        full: "Khi em truy cập trang {host}, sẽ tự chuyển IP sang {location}",
                        host: {
                            placeholder: "facebook.com",
                            _post: null,
                            _pre: "Khi tôi truy cập"
                        },
                        location: {
                            off: "Tắt ChromeVPN",
                            _post: null,
                            _pre: "thì chuyển tôi đến"
                        }
                    },
                    toggle_off: "ChromeVPN đang được",
                    toggle_on: "ChromeVPN đang được"
                },
                settings: {
                    account: {
                        account_dashboard: "Account Dashboard",
                        get_premium: "Buy ZenMate Premium",
                        log_in: "Log in",
                        sign_out: "Log out",
                        sign_up: "Get 7 days of Premium free!",
                        title: "Account",
                        verify: "Verify your email"
                    },
                    copy: "Access your account or configure general ZenMate settings",
                    general: {
                        change_language: "Change language",
                        support: "Get help",
                        title: "General"
                    },
                    heading: "Settings",
                    labs: {
                        title: "Labs"
                    }
                }
            },
            widget: {
                unverified: {
                    cta: "Try Premium for free",
                    dismiss: "Remind me later",
                    heading: "You're using ZenMate Free.",
                    message: "With ZenMate Free, you are protected but will experience limited speed. Feel the difference with ZenMate Premium now."
                },
                verified: {
                    cta: "Upgrade to Premium",
                    dismiss: "Remind me later",
                    heading: "You're using ZenMate Free.",
                    message: "Buy ZenMate Premium for only €6.49 with turbo speed for HD quality streaming!"
                }
            }
        }
    }, {}]
}, {}, [1]);