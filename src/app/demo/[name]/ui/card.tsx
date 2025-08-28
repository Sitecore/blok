import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const card = {
  name: "card",
  components: {
    // Elevation Variants
    ElevationNone: (
      <Card style="outline" elevation="none" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>none Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: none</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the none elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    ElevationXs: (
      <Card style="outline" elevation="xs" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>xs Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: xs</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the xs elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    ElevationSm: (
      <Card style="outline" elevation="sm" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>sm Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: sm</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the sm elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    ElevationBase: (
      <Card style="outline" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>base Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the base elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    ElevationMd: (
      <Card style="outline" elevation="md" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>md Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: md</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the md elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    ElevationLg: (
      <Card style="outline" elevation="lg" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>lg Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: lg</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the lg elevation variant with outline style.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),

    // Style Variants
    StyleFlat: (
      <Card style="flat" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>flat Style</CardTitle>
          <CardDescription>Style: flat, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the flat style variant with base elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    StyleOutline: (
      <Card style="outline" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>outline Style</CardTitle>
          <CardDescription>Style: outline, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the outline style variant with base elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    StyleFilled: (
      <Card style="filled" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>filled Style</CardTitle>
          <CardDescription>Style: filled, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the filled style variant with base elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),

    // Padding Variants
    PaddingSm: (
      <Card style="outline" elevation="md" padding="sm" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: sm</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: sm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the sm padding variant with outline style and md elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    PaddingMd: (
      <Card style="outline" elevation="md" padding="md" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: md</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: md
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the md padding variant with outline style and md elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
    PaddingLg: (
      <Card style="outline" elevation="md" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: lg</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: lg
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates the lg padding variant with outline style and md elevation.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Action</Button>
        </CardFooter>
      </Card>
    ),
  },
};
