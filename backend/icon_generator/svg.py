import svgwrite


def draw_logo(filename):
    # Define your colors
    midnight_blue = "#145DA0"
    dark_blue = "#0C2D48"

    # Define icon size
    icon_size = 64  # You can adjust this value to your desired icon size

    dwg = svgwrite.Drawing(
        filename, size=(icon_size * 4, icon_size * 3), profile="tiny"
    )

    # Calculate center positions
    center_x = icon_size * 2
    center_y = icon_size * 1.5

    # Add the SVG rocket
    rocket_path = "icon_generator/rocket-3421.svg"
    dwg.add(
        dwg.image(
            href=rocket_path,
            insert=(center_x - icon_size / 2, center_y - icon_size / 2),
            size=(icon_size, icon_size),
        )
    )

    # Add the slogan in dark blue at the bottom
    dwg.add(
        dwg.text(
            "Fra øving til perfeksjon",
            insert=(icon_size / 2, icon_size * 2.5),
            font_size="12px",
            fill=dark_blue,
        )
    )

    # Add the company name in midnight blue above the slogan
    dwg.add(
        dwg.text(
            "Skrive Mestring",
            insert=(icon_size / 2, icon_size * 2),
            font_size="18px",
            font_weight="bold",
            fill=midnight_blue,
        )
    )

    dwg.save()


# Call the function to create the SVG file
draw_logo("logo_with_rocket.svg")
