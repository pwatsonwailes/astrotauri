/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      red: {
        50: "oklch(.971 .013 17.38)",
        100: "oklch(.936 .032 17.717)",
        200: "oklch(.885 .062 18.334)",
        300: "oklch(.808 .114 19.571)",
        400: "oklch(.704 .191 22.216)",
        500: "oklch(.637 .237 25.331)",
        600: "oklch(.577 .245 27.325)",
        700: "oklch(.505 .213 27.518)",
        800: "oklch(.444 .177 26.899)",
        900: "oklch(.396 .141 25.723)",
        950: "oklch(.258 .092 26.042)",
      },
      orange: {
        50: "oklch(.98 .016 73.684)",
        100: "oklch(.954 .038 75.164)",
        200: "oklch(.901 .076 70.697)",
        300: "oklch(.837 .128 66.29)",
        400: "oklch(.75 .183 55.934)",
        500: "oklch(.705 .213 47.604)",
        600: "oklch(.646 .222 41.116)",
        700: "oklch(.553 .195 38.402)",
        800: "oklch(.47 .157 37.304)",
        900: "oklch(.408 .123 38.172)",
        950: "oklch(.266 .079 36.259)",
      },
      amber: {
        50: "oklch(.987 .022 95.277)",
        100: "oklch(.962 .059 95.617)",
        200: "oklch(.924 .12 95.746)",
        300: "oklch(.879 .169 91.605)",
        400: "oklch(.828 .189 84.429)",
        500: "oklch(.769 .188 70.08)",
        600: "oklch(.666 .179 58.318)",
        700: "oklch(.555 .163 48.998)",
        800: "oklch(.473 .137 46.201)",
        900: "oklch(.414 .112 45.904)",
        950: "oklch(.279 .077 45.635)",
      },
      yellow: {
        50: "oklch(.987 .026 102.212)",
        100: "oklch(.973 .071 103.193)",
        200: "oklch(.945 .129 101.54)",
        300: "oklch(.905 .182 98.111)",
        400: "oklch(.852 .199 91.936)",
        500: "oklch(.795 .184 86.047)",
        600: "oklch(.681 .162 75.834)",
        700: "oklch(.554 .135 66.442)",
        800: "oklch(.476 .114 61.907)",
        900: "oklch(.421 .095 57.708)",
        950: "oklch(.286 .066 53.813)",
      },
      lime: {
        50: "oklch(.986 .031 120.757)",
        100: "oklch(.967 .067 122.328)",
        200: "oklch(.938 .127 124.321)",
        300: "oklch(.897 .196 126.665)",
        400: "oklch(.841 .238 128.85)",
        500: "oklch(.768 .233 130.85)",
        600: "oklch(.648 .2 131.684)",
        700: "oklch(.532 .157 131.589)",
        800: "oklch(.453 .124 130.933)",
        900: "oklch(.405 .101 131.063)",
        950: "oklch(.274 .072 132.109)",
      },
      green: {
        50: "oklch(.982 .018 155.826)",
        100: "oklch(.962 .044 156.743)",
        200: "oklch(.925 .084 155.995)",
        300: "oklch(.871 .15 154.449)",
        400: "oklch(.792 .209 151.711)",
        500: "oklch(.723 .219 149.579)",
        600: "oklch(.627 .194 149.214)",
        700: "oklch(.527 .154 150.069)",
        800: "oklch(.448 .119 151.328)",
        900: "oklch(.393 .095 152.535)",
        950: "oklch(.266 .065 152.934)",
      },
      emerald: {
        50: "oklch(.979 .021 166.113)",
        100: "oklch(.95 .052 163.051)",
        200: "oklch(.905 .093 164.15)",
        300: "oklch(.845 .143 164.978)",
        400: "oklch(.765 .177 163.223)",
        500: "oklch(.696 .17 162.48)",
        600: "oklch(.596 .145 163.225)",
        700: "oklch(.508 .118 165.612)",
        800: "oklch(.432 .095 166.913)",
        900: "oklch(.378 .077 168.94)",
        950: "oklch(.262 .051 172.552)",
      },
      teal: {
        50: "oklch(.984 .014 180.72)",
        100: "oklch(.953 .051 180.801)",
        200: "oklch(.91 .096 180.426)",
        300: "oklch(.855 .138 181.071)",
        400: "oklch(.777 .152 181.912)",
        500: "oklch(.704 .14 182.503)",
        600: "oklch(.6 .118 184.704)",
        700: "oklch(.511 .096 186.391)",
        800: "oklch(.437 .078 188.216)",
        900: "oklch(.386 .063 188.416)",
        950: "oklch(.277 .046 192.524)",
      },
      cyan: {
        50: "oklch(.984 .019 200.873)",
        100: "oklch(.956 .045 203.388)",
        200: "oklch(.917 .08 205.041)",
        300: "oklch(.865 .127 207.078)",
        400: "oklch(.789 .154 211.53)",
        500: "oklch(.715 .143 215.221)",
        600: "oklch(.609 .126 221.723)",
        700: "oklch(.52 .105 223.128)",
        800: "oklch(.45 .085 224.283)",
        900: "oklch(.398 .07 227.392)",
        950: "oklch(.302 .056 229.695)",
      },
      sky: {
        50: "oklch(.977 .013 236.62)",
        100: "oklch(.951 .026 236.824)",
        200: "oklch(.901 .058 230.902)",
        300: "oklch(.828 .111 230.318)",
        400: "oklch(.746 .16 232.661)",
        500: "oklch(.685 .169 237.323)",
        600: "oklch(.588 .158 241.966)",
        700: "oklch(.5 .134 242.749)",
        800: "oklch(.443 .11 240.79)",
        900: "oklch(.391 .09 240.876)",
        950: "oklch(.293 .066 243.157)",
      },
      blue: {
        50: "oklch(.97 .014 254.604)",
        100: "oklch(.932 .032 255.585)",
        200: "oklch(.882 .059 254.128)",
        300: "oklch(.809 .105 251.813)",
        400: "oklch(.707 .165 254.624)",
        500: "oklch(.623 .214 259.815)",
        600: "oklch(.546 .245 262.881)",
        700: "oklch(.488 .243 264.376)",
        800: "oklch(.424 .199 265.638)",
        900: "oklch(.379 .146 265.522)",
        950: "oklch(.282 .091 267.935)",
      },
      indigo: {
        50: "oklch(.962 .018 272.314)",
        100: "oklch(.93 .034 272.788)",
        200: "oklch(.87 .065 274.039)",
        300: "oklch(.785 .115 274.713)",
        400: "oklch(.673 .182 276.935)",
        500: "oklch(.585 .233 277.117)",
        600: "oklch(.511 .262 276.966)",
        700: "oklch(.457 .24 277.023)",
        800: "oklch(.398 .195 277.366)",
        900: "oklch(.359 .144 278.697)",
        950: "oklch(.257 .09 281.288)",
      },
      violet: {
        50: "oklch(.969 .016 293.756)",
        100: "oklch(.943 .029 294.588)",
        200: "oklch(.894 .057 293.283)",
        300: "oklch(.811 .111 293.571)",
        400: "oklch(.702 .183 293.541)",
        500: "oklch(.606 .25 292.717)",
        600: "oklch(.541 .281 293.009)",
        700: "oklch(.491 .27 292.581)",
        800: "oklch(.432 .232 292.759)",
        900: "oklch(.38 .189 293.745)",
        950: "oklch(.283 .141 291.089)",
      },
      purple: {
        50: "oklch(.977 .014 308.299)",
        100: "oklch(.946 .033 307.174)",
        200: "oklch(.902 .063 306.703)",
        300: "oklch(.827 .119 306.383)",
        400: "oklch(.714 .203 305.504)",
        500: "oklch(.627 .265 303.9)",
        600: "oklch(.558 .288 302.321)",
        700: "oklch(.496 .265 301.924)",
        800: "oklch(.438 .218 303.724)",
        900: "oklch(.381 .176 304.987)",
        950: "oklch(.291 .149 302.717)",
      },
      fuchsia: {
        50: "oklch(.977 .017 320.058)",
        100: "oklch(.952 .037 318.852)",
        200: "oklch(.903 .076 319.62)",
        300: "oklch(.833 .145 321.434)",
        400: "oklch(.74 .238 322.16)",
        500: "oklch(.667 .295 322.15)",
        600: "oklch(.591 .293 322.896)",
        700: "oklch(.518 .253 323.949)",
        800: "oklch(.452 .211 324.591)",
        900: "oklch(.401 .17 325.612)",
        950: "oklch(.293 .136 325.661)",
      },
      pink: {
        50: "oklch(.971 .014 343.198)",
        100: "oklch(.948 .028 342.258)",
        200: "oklch(.899 .061 343.231)",
        300: "oklch(.823 .12 346.018)",
        400: "oklch(.718 .202 349.761)",
        500: "oklch(.656 .241 354.308)",
        600: "oklch(.592 .249 .584)",
        700: "oklch(.525 .223 3.958)",
        800: "oklch(.459 .187 3.815)",
        900: "oklch(.408 .153 2.432)",
        950: "oklch(.284 .109 3.907)",
      },
      rose: {
        50: "oklch(.969 .015 12.422)",
        100: "oklch(.941 .03 12.58)",
        200: "oklch(.892 .058 10.001)",
        300: "oklch(.81 .117 11.638)",
        400: "oklch(.712 .194 13.428)",
        500: "oklch(.645 .246 16.439)",
        600: "oklch(.586 .253 17.585)",
        700: "oklch(.514 .222 16.935)",
        800: "oklch(.455 .188 13.697)",
        900: "oklch(.41 .159 10.272)",
        950: "oklch(.271 .105 12.094)",
      },
      slate: {
        50: "oklch(.984 .003 247.858)",
        100: "oklch(.968 .007 247.896)",
        200: "oklch(.929 .013 255.508)",
        300: "oklch(.869 .022 252.894)",
        400: "oklch(.704 .04 256.788)",
        500: "oklch(.554 .046 257.417)",
        600: "oklch(.446 .043 257.281)",
        700: "oklch(.372 .044 257.287)",
        800: "oklch(.279 .041 260.031)",
        900: "oklch(.208 .042 265.755)",
        950: "oklch(.129 .042 264.695)",
      },
      gray: {
        50: "oklch(.985 .002 247.839)",
        100: "oklch(.967 .003 264.542)",
        200: "oklch(.928 .006 264.531)",
        300: "oklch(.872 .01 258.338)",
        400: "oklch(.707 .022 261.325)",
        500: "oklch(.551 .027 264.364)",
        600: "oklch(.446 .03 256.802)",
        700: "oklch(.373 .034 259.733)",
        800: "oklch(.278 .033 256.848)",
        900: "oklch(.21 .034 264.665)",
        950: "oklch(.13 .028 261.692)",
      },
      zinc: {
        50: "oklch(.985 0 0)",
        100: "oklch(.967 .001 286.375)",
        200: "oklch(.92 .004 286.32)",
        300: "oklch(.871 .006 286.286)",
        400: "oklch(.705 .015 286.067)",
        500: "oklch(.552 .016 285.938)",
        600: "oklch(.442 .017 285.786)",
        700: "oklch(.37 .013 285.805)",
        800: "oklch(.274 .006 286.033)",
        900: "oklch(.21 .006 285.885)",
        950: "oklch(.141 .005 285.823)",
      },
      neutral: {
        50: "oklch(.985 0 0)",
        100: "oklch(.97 0 0)",
        200: "oklch(.922 0 0)",
        300: "oklch(.87 0 0)",
        400: "oklch(.708 0 0)",
        500: "oklch(.556 0 0)",
        600: "oklch(.439 0 0)",
        700: "oklch(.371 0 0)",
        800: "oklch(.269 0 0)",
        900: "oklch(.205 0 0)",
        950: "oklch(.145 0 0)",
      },
      stone: {
        50: "oklch(.985 .001 106.423)",
        100: "oklch(.97 .001 106.424)",
        200: "oklch(.923 .003 48.717)",
        300: "oklch(.869 .005 56.366)",
        400: "oklch(.709 .01 56.259)",
        500: "oklch(.553 .013 58.071)",
        600: "oklch(.444 .011 73.639)",
        700: "oklch(.374 .01 67.558)",
        800: "oklch(.268 .007 34.298)",
        900: "oklch(.216 .006 56.043)",
        950: "oklch(.147 .004 49.25)"
      }
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            '[class~="lead"]': {
              color: theme('colors.gray.300'),
            },
            a: {
              color: theme('colors.amber.600'),
              '&:hover': {
                color: theme('colors.amber.500'),
              },
            },
            strong: {
              color: theme('colors.white'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.700'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.white'),
            },
            'a code': {
              color: theme('colors.white'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
            thead: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.gray.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};